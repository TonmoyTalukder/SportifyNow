import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Image, Progress, ProgressProps, Typography } from "antd";
import { BiSolidCoin } from "react-icons/bi";
import { gradientStyle } from "../../styles/gradientStyle";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { getBadgeAndPercentage } from "../../utils/badgeAndPercentage";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const { Text } = Typography;

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#0b2141",
};

const CustomHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user!);
  const { data: userData } = useGetSingleUserQuery(user.id);
  const rewards = userData?.data.rewards;
  const { badge, percentage } = getBadgeAndPercentage(user.rewardsCount || 0);

  const maleDp = "/maleAvatar.png";
  const femaleDp = "/femaleAvatar.png";

  const dp = user.sex === "male" ? maleDp : femaleDp;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        margin: "2vh 1vw",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          marginRight: "1vw",
        }}
      >
        <Image
          src={dp}
          alt="SportifyNow"
          style={{
            height: "50px",
            width: "50px",
            filter: "drop-shadow(5px 5px 10px rgba(154, 154, 96, 0.8))",
            transform: "rotateY(25deg)",
            borderRadius: "50%",
            border: "1px solid #213c63",
          }}
          preview={false}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              marginLeft: "0.5vw",
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "12px",
              marginLeft: "1vw",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "#c99648",
                fontSize: "18px",
                marginTop: "0.2vh",
                marginRight: "0.3vw",
              }}
            >
              <BiSolidCoin />
            </span>
            {rewards ? rewards : 0}
          </Text>
        </div>
      </div>
      {/* Badge Section */}
      <div
        style={{
          ...gradientStyle,
          display: "flex",
          alignItems: "center",
          // marginRight: "5vw",
          borderRadius: "15px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          width: "",
          height: "auto",
          padding: "1vh 1.5vw",
        }}
      >
        <div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "35px",
              marginRight: "0.2vw",
              // marginTop: "2vh",
              color:
                badge === "Silver"
                  ? "#c0c0c0"
                  : badge === "Golden"
                  ? "#FFD700"
                  : "#00FFFF",
              // backgroundColor: "red",
            }}
          >
            <RiPoliceBadgeLine />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "start",
            height: "100%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              marginTop: "0.4vh",
              color: "#FBFCF8",
            }}
          >
            {badge} Badge
          </Text>

          <Progress
            size={{ width: 90, height: 10 }}
            percent={percentage}
            trailColor="#FBFCF8"
            status="active"
            strokeColor={twoColors}
            format={(percent) => (
              <span style={{ color: "white" }}>{`${percent}%`}</span>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
