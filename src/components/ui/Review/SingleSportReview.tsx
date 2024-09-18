import { useState } from "react";
import {
  Button,
  Card,
  Input,
  List,
  Modal,
  Form,
  Typography,
  message,
  Popconfirm,
  Avatar,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetReviewsByFacilityQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useAddReplyMutation,
  useAdminDeleteReviewMutation,
} from "../../../redux/features/review/reviewApi";
import { RootState } from "../../../redux/store";
import { PiPaperPlaneRightFill, PiUserDuotone } from "react-icons/pi";
import "./reviewStyles.css";
// import UserDetailList, { Reply } from "../UserDetails/UserDetailList";
import SingleReply, { Reply } from "./SingleReply";

const { TextArea } = Input;
const { Title } = Typography;

interface Review {
  _id: string;
  content: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  replies: Reply[];
}

const SingleSportReview = () => {
  const { id: facilityId } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user!);
  const isAdmin = user?.role === "admin";

  const { data: reviewsData, isLoading } = useGetReviewsByFacilityQuery(
    facilityId,
    {
      pollingInterval: 30000, // 30 seconds in milliseconds
    },
  );

  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [adminDeleteReview] = useAdminDeleteReviewMutation();
  const [addReply] = useAddReplyMutation();

  const [reviewText, setReviewText] = useState("");
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({}); // Object to track reply text for each review
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [minRow, setMinRow] = useState(1);

  const handleFocus = () => {
    setMinRow(2);
  };

  const handleBlur = () => {
    if (reviewText.length === 0) {
      setMinRow(1);
    }
  };

  const iconColor = reviewText.length > 0 ? "#6592bf" : "#7c7e80";
  const reviewTextExist = reviewText.length > 0;

  const handleCreateReview = async () => {
    if (reviewText.trim() === "") return;
    try {
      const reviewCreate = await createReview({
        facilityId,
        content: reviewText,
      });
      message.success("Review added successfully");
      console.log("reviewCreate => ", reviewCreate);
      setReviewText("");
    } catch {
      message.error("Failed to add review");
    }
  };

  const handleEditReview = (reviewId: string, content: string) => {
    setEditReviewId(reviewId);
    setReviewText(content);
    setIsModalVisible(true);
  };

  const handleUpdateReview = async () => {
    try {
      await updateReview({
        reviewId: editReviewId,
        reviewData: { content: reviewText },
      });
      message.success("Review updated successfully");
      setReviewText("");
      setEditReviewId(null);
      setIsModalVisible(false);
    } catch {
      message.error("Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      message.success("Review deleted successfully");
    } catch {
      message.error("Failed to delete review");
    }
  };

  const handleAdminDeleteReview = async (reviewId: string) => {
    try {
      await adminDeleteReview(reviewId);
      message.success("Review deleted by admin successfully");
    } catch {
      message.error("Failed to delete review");
    }
  };

  const handleAddReply = async (reviewId: string) => {
    const replyText = replyTexts[reviewId];
    if (replyText.trim() === "") return;
    try {
      await addReply({ reviewId, replyData: { content: replyText } });
      message.success("Reply added successfully");
      setReplyTexts({ ...replyTexts, [reviewId]: "" }); // Clear the reply text for the specific reviewId
    } catch {
      message.error("Failed to add reply");
    }
  };

  const handleReplyTextChange = (reviewId: string, value: string) => {
    setReplyTexts((prev) => ({
      ...prev,
      [reviewId]: value,
    }));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Title style={{ color: "white" }} level={4}>
        Reviews ({reviewsData?.data?.length || 0})
      </Title>
      {reviewsData?.data?.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={reviewsData.data}
          renderItem={(review: unknown) => {
            const typedReview = review as Review;
            const userAvatar = typedReview.userId.avatar;
            return (
              <Card
                key={typedReview._id}
                style={{
                  marginBottom: "16px",
                  borderRadius: "8px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  boxShadow: "0 4px 8px #fbfcf850",
                  border: "1px solid #fbfcf850",
                }}
              >
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      typedReview.userId ? (
                        <>
                          {userAvatar ? (
                            <Avatar
                              style={{ backgroundColor: "#abb9c7" }}
                              src={userAvatar}
                            />
                          ) : (
                            <Avatar
                              style={{ backgroundColor: "#abb9c7" }}
                              src={
                                <PiUserDuotone
                                  style={{ fontSize: "30px", color: "black" }}
                                />
                              }
                            />
                          )}
                        </>
                      ) : null
                    }
                    title={
                      <span style={{ color: "lightblue" }}>
                        {typedReview.userId
                          ? typedReview.userId.name
                          : "Anonymous"}
                      </span>
                    }
                    description={
                      <span style={{ color: "lightgray" }}>
                        {typedReview.content}
                      </span>
                    }
                  />

                  {user && user.id === typedReview.userId._id && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginLeft: "50px",
                      }}
                    >
                      <div
                        onClick={() =>
                          handleEditReview(typedReview._id, typedReview.content)
                        }
                        style={{
                          zIndex: 0,
                          color: "lightblue",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </div>

                      <div>
                        <Popconfirm
                          title="Are you sure to delete this review?"
                          onConfirm={() => handleDeleteReview(typedReview._id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span
                            style={{
                              zIndex: 0,
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </span>
                        </Popconfirm>
                      </div>
                    </div>
                  )}

                  {isAdmin && (
                    <Popconfirm
                      title="Admin: Delete this review?"
                      onConfirm={() => handleAdminDeleteReview(typedReview._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div
                        style={{ zIndex: 0, color: "red", marginLeft: "50px" }}
                      >
                        Admin Delete
                      </div>
                    </Popconfirm>
                  )}
                </List.Item>

                <div
                  style={{
                    marginLeft: "50px",
                    marginBottom: "5px",
                    borderLeft: "2px solid rgba(212, 212, 212, 0.31)",
                    borderRadius: "0px 0px 0px 15px",
                    paddingLeft: "15px",
                  }}
                >
                  {typedReview.replies.length > 0 &&
                    typedReview.replies.map((reply, index) => (
                      <SingleReply
                        key={index}
                        replies={[reply]}
                        reviewId={typedReview._id}
                      />
                    ))}
                </div>

                <div
                  key={typedReview._id}
                  style={{
                    marginLeft: "50px",
                    marginTop: "20px",
                    position: "relative",
                  }}
                >
                  {user ? (
                    <TextArea
                      value={replyTexts[typedReview._id] || ""} // Get the reply text for the current review
                      onChange={(e) =>
                        handleReplyTextChange(typedReview._id, e.target.value)
                      }
                      placeholder={`Reply to ${typedReview!.userId.name}`}
                      autoSize={{ minRows: minRow, maxRows: 5 }}
                      className="textarea-custom"
                      style={{
                        borderRadius: "15px",
                        paddingRight: "30px",
                        boxSizing: "border-box",
                        backgroundColor: "#252729",
                        color: "#fff",
                        border: "0px solid transparent",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  ) : (
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <Link to="/login">Login</Link> to reply.
                      </p>
                    </div>
                  )}
                  {replyTexts[typedReview._id]?.length > 0 && (
                    <>
                      <button
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          right: "18px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        onClick={() => handleAddReply(typedReview._id)}
                      >
                        <PiPaperPlaneRightFill
                          style={{
                            color: "#6592bf",
                            fontSize: "20px",
                          }}
                        />
                      </button>
                    </>
                  )}
                </div>
              </Card>
            );
          }}
        />
      ) : (
        <p style={{ textAlign: "center" }}>
          No reviews yet. Be the first to leave a review!
        </p>
      )}

      <Card
        style={{
          marginTop: "20px",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0 4px 8px #fbfcf850",
          border: "1px solid #fbfcf850",
        }}
      >
        {user ? (
          <Form.Item style={{ marginBottom: "0" }}>
            <div style={{ position: "relative" }}>
              <TextArea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={`Review as ${user.name}`}
                autoSize={{ minRows: minRow, maxRows: 5 }}
                className="textarea-custom"
                style={{
                  borderRadius: "15px",
                  paddingRight: "30px",
                  boxSizing: "border-box",
                  backgroundColor: "#252729",
                  color: "#fff",
                  border: "0px solid transparent",
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {reviewTextExist && (
                <>
                  <button
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "18px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      editReviewId
                        ? handleUpdateReview()
                        : handleCreateReview();
                    }}
                  >
                    <PiPaperPlaneRightFill
                      style={{
                        color: iconColor,
                        fontSize: "20px",
                      }}
                    />
                  </button>
                </>
              )}
            </div>
          </Form.Item>
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>
              <Link to="/login">Login</Link> to write a review.
            </p>
          </div>
        )}
      </Card>

      {/* Edit Review Modal */}
      <Modal
        title="Edit Review"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateReview}>
            Update
          </Button>,
        ]}
      >
        <TextArea
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default SingleSportReview;
