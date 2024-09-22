import { useState } from "react";
import { Button, Typography, Space, Spin, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
  useGenerateReferralCodeMutation,
  useGetReferralCodeQuery,
} from "../../../redux/features/user/userApi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const { Text } = Typography;

const ReferralCode = () => {
  const userName = useSelector((state: RootState) => state.auth.user!.name);
  const { data, isLoading, error } = useGetReferralCodeQuery(undefined);
  const [generateReferralCode, { isLoading: generating }] =
    useGenerateReferralCodeMutation();

console.log("refer data => ", data);
console.log("refer error => ", error);

  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Handle referral code generation
  const handleGenerateReferralCode = async () => {
    try {
      const result = await generateReferralCode(undefined).unwrap(); // Pass undefined if no argument is needed
      setReferralCode(result.referralCode);
      message.success("Referral code generated successfully!");
    } catch (err) {
      message.error("Failed to generate referral code");
      console.log("err => ", err)
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "20px 0",
        textAlign: "left",
        backgroundColor: "transparent",
        border: "1px solid transparent",
        boxShadow: "0px",
      }}
    >
      <Space direction="vertical" size="large">
        {/* Show the referral code */}
        {isLoading ? (
          <Spin tip="Loading..." />
        ) : error ? (
          <Text type="danger">Failed to load referral code</Text>
        ) : referralCode || data?.referralCode ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text strong>Your Referral Code: &nbsp;</Text>{" "}
            <Text copyable={{ text: `Hi! I am inviting you to join SportifyNow! Join with my referralCode: ${referralCode || data?.referralCode}, and get 10 reward points extra. You can even buy a coffee with the rewards! Sign up here -> https://sportifynow.vercel.app/#/register. Best, ${userName}.` }} style={{ fontSize: 18 }}>
              {referralCode || data?.referralCode}
            </Text>
          </div>
        ) : (
          <Text>{data?.message}</Text>
        )}

        {/* Generate referral code button */}
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          loading={generating}
          onClick={handleGenerateReferralCode}
        >
          {referralCode || data?.referralCode
            ? "Regenerate Referral Code"
            : "Generate Referral Code"}
        </Button>
      </Space>
    </div>
  );
};

export default ReferralCode;
