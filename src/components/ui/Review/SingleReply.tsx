import React from "react";
import { useSelector } from "react-redux";
import { Avatar, List, Popconfirm, message } from "antd";
import { PiUserDuotone } from "react-icons/pi";
import { RootState } from "../../../redux/store"; // Import RootState to use user state
import { useDeleteReplyMutation } from "../../../redux/features/review/reviewApi";
import { useGetSingleUserQuery } from "../../../redux/features/user/userApi";

export interface Reply {
  _id: string;
  userId: string | number;
  content: string;
}

interface Props {
  replies: Reply[];
  reviewId: string; // Pass reviewId to reference in reply deletion
}

const SingleReply: React.FC<Props> = ({ replies, reviewId }) => {
  const user = useSelector((state: RootState) => state.auth.user); // Get logged-in user details
  const isAdmin = user?.role === "admin";

  // const replyId = replies[0]._id;

  // console.log(replies)

  const { data: replyUserData } = useGetSingleUserQuery(replies[0].userId);
  const replyUser = replyUserData?.data;
  // console.log(replyUser)
  const replyUserAvatar = replyUser?.avatar;

  const [deleteReply] = useDeleteReplyMutation(); // Mutation to delete the reply

  const handleDeleteReply = async (replyId: string) => {
    try {
      await deleteReply({ reviewId, replyId }); // Assuming reply deletion requires both reviewId and replyId
      message.success("Reply deleted successfully");
    } catch (error) {
      message.error("Failed to delete reply");
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={replies}
      renderItem={(reply) => {
        return (
          <List.Item>
            <div
              style={{
                position: "absolute",
                left: "-15px",
                top: "30px",
                transform: "translateY(-50%)",
                height: "1px",
                width: "20px",
                backgroundColor: "rgba(212, 212, 212, 0.61)",
              }}
            ></div>
            <List.Item.Meta
              avatar={
                replyUserAvatar ? (
                  <Avatar
                    style={{
                      backgroundColor: "white",
                    }}
                    src={replyUserAvatar}
                  />
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: "white",
                    }}
                    src={
                      <PiUserDuotone
                        style={{ fontSize: "30px", color: "black" }}
                      />
                    }
                  />
                )
              }
              title={
                <span
                  style={{
                    color: "lightblue",
                  }}
                >
                  {replyUser? replyUser?.name: "USER"}
                </span>
              }
              description={
                <span
                  style={{
                    color: "lightgray",
                  }}
                >
                  {reply.content}
                </span>
              }
            />

            {/* Delete Button for Own Reply or Admin */}
            {user && (user.id === reply.userId || isAdmin) && (
              <Popconfirm
                title="Are you sure you want to delete this reply?"
                onConfirm={() => handleDeleteReply(reply._id)}
                okText="Yes"
                cancelText="No"
              >
                <span
                  style={{
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </span>
              </Popconfirm>
            )}
          </List.Item>
        );
      }}
    />
  );
};

export default SingleReply;
