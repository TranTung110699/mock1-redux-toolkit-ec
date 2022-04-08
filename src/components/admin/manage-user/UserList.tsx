import { Button, Card, Col, Pagination, Row, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
// import "../admin.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminUserAction } from "../../../features/admin/manage-user/adminUserSlice";
import { ManageUser } from "../../../models/User";

const UserListComponent = (props: any) => {
  const { id } = useParams();
  const [myPage, setMypage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPages = useRef(0);

  const userList = useAppSelector((state) => state.adminUser.users.results);
  const myTotalPages = useAppSelector(
    (state) => state.adminUser.users.totalPages
  );

  const sendPageData = () => {
    props.parentCallback(myPage);
  };

  useEffect(() => {
    dispatch(adminUserAction.getAdminUser({ page: myPage }));
  }, [dispatch]);

  const clickDetail = (idQuestion: string) => {
    sendPageData();
    window.scrollTo(0, 0);
    navigate("/admin/user-manage/" + idQuestion);
  };

  const onChangePage = (pageNumber: number) => {
    window.scrollTo(0, 0);
    setMypage(pageNumber);
    dispatch(adminUserAction.getAdminUser({ page: pageNumber }));
  };

  const cancel = () => {};

  const clickAddUser = () => {
    navigate("/admin/user-manage");
  };
  return (
    <div>
      {userList.length > 0 ? (
        <div className="site-card-wrapper">
          {id ? (
            <Space align="center" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                onClick={clickAddUser}
              >
                Add User
              </Button>
            </Space>
          ) : null}
          <Row gutter={[8, 8]}>
            {userList.map((user: ManageUser, index: any) => (
              <Col span={24}>
                <Card title={user.username} bordered={false}>
                  <Row>
                    <Col span={6}>
                      <img
                        width={"50px"}
                        height={"50px"}
                        src={user.avatar}
                        alt={user.username}
                      />
                    </Col>
                    <Col span={3}></Col>
                    <Col span={12}>
                      <div>
                        <i>{user.email}</i>
                      </div>
                      <div>
                        <b
                          style={{
                            color: user.role === "admin" ? "green" : "orange",
                          }}
                        >
                          {user.role}
                        </b>
                      </div>
                    </Col>
                    <Col span={3}>
                      <a
                        onClick={() => {
                          clickDetail(user.id);
                        }}
                      >
                        Detail
                      </a>
                    </Col>
                  </Row>
                  <hr />
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify="end" style={{ marginTop: 10 }}>
            <Pagination
              defaultCurrent={1}
              total={myTotalPages * 10}
              onChange={onChangePage}
            />
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default UserListComponent;
