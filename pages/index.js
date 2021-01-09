import React, { useState, createElement, useEffect } from "react";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Input,
  Button,
  Row,
  Col,
  Comment,
  Tooltip,
  Avatar,
  Image,
  Typography,
} from "antd";
import {
  UserOutlined,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import moment from "moment";

export default function Home() {
  const { Header, Sider, Content } = Layout;
  const { Title } = Typography;
  const [mess, setMess] = useState([]);
  const [newMess, setNewMess] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [userSelected, setUserSelected] = useState({ id: null, name: "" });

  const rState = useSelector((state) => state);

  const sendMessage = () => {
    let allMess = mess;
    allMess.push({ id: 1, message: newMess });
    setMess(allMess);
    setNewMess("");
  };

  const ChatMessage = (props) => {
    return (
      <div>
        <Comment
          actions={actions}
          author={<a>{props.senderName}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<p>{props.message}</p>}
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    );
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {rState.users.map((x) => {
            if (x.id !== rState.logedInUser.id) {
              return (
                <Menu.Item
                  key={x.id}
                  icon={<UserOutlined />}
                  onClick={() => setUserSelected({ id: x.id, name: x.name })}
                >
                  {x.name}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1>{userSelected.name}</h1>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "100vh",
          }}
        >
          {userSelected.name !== "" ? (
            <div className="site-layout-background">
              {rState.allMessage.map((x) => {
                if (x.id === userSelected.id) {
                  let sendFromID = x.sendFrom;
                  let sendFrom = rState.users.filter((x) =>
                    sendFromID === x.id ? x.name : null
                  );
                  return (
                    <ChatMessage
                      key={x.id}
                      senderName={sendFrom[0].name}
                      message={x.message}
                    />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
              <br />
              <div style={{ marginTop: "10px" }}>
                <Title level={3} type="success">
                  {rState.logedInUser.name}
                </Title>
              </div>
            </div>
          )}
        </Content>
        {userSelected.name !== "" ? (
          <Row style={{ position: "sticky", bottom: "0", margin: "10" }}>
            <Col span={8} offset="7">
              <Input
                value={newMess}
                onChange={(e) => setNewMess(e.target.value)}
                placeholder="Enter Message here"
              />
            </Col>
            <Col span={8}>
              <Button onClick={sendMessage} type="primary">
                Send
              </Button>
            </Col>
          </Row>
        ) : null}
      </Layout>
    </Layout>
  );
}
