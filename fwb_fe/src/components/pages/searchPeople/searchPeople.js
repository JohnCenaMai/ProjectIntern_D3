import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Input,
  Modal,
  Empty,
  Spin,
  Typography,
  Form,
  List,
  Skeleton,
  Avatar,
  Radio,
  DatePicker,
  Button,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../common/sidebar/sider";
import "./searchPeople.css";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const initialFilterValue = {
  gender: null,
  age: null,
  country: "",
  region: "",
};

function SearchPeople() {
  const [filterData, setFilterData] = useState(initialFilterValue);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([
    {
      id: 95,
      email: "lamnk@gmail.com",
      username: "nklam",
      full_name: "NGUYEN KHAC LAM",
      imageUrl: "image-1611027008332.jpeg",
      region: "Capital Federal",
      country: "Argentina",
    },
    {
      id: 93,
      email: "lam@gmail.com",
      username: "Lam Nguyen Khac",
      full_name: "Nguyen Khac Lam",
      imageUrl: "image-1611196172695.jpeg",
      region: "Bedford",
      country: "United Kingdom",
    },
    {
      id: 103,
      email: "blabla@gmail.com",
      username: "Fan Mu",
      full_name: "Fan Mu",
      imageUrl: "image-1611198647626.jpeg",
      region: "Karlovačka Županija",
      country: "Croatia",
    },
    {
      id: 103,
      email: "blabla@gmail.com",
      username: "Fan Mu",
      full_name: "Fan Mu",
      imageUrl: "image-1611198647626.jpeg",
      region: "Karlovačka Županija",
      country: "Croatia",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const filter = () => {
    setIsModalVisible(true);
  };

  const onSearch = () => {};

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(filterData);
  };

  const renderResult = () => {
    let results = <Empty />;
    if (searchResult.length !== 0) {
      results = (
        <div className="searchResults">
          <List
            itemLayout="horizontal"
            dataSource={searchResult}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          item.imageUrl
                            ? `http://localhost:5000/images/${item.imageUrl}`
                            : "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg"
                        }
                      />
                    }
                    title={
                      <Link to={`/profile/${item.id}`}>{item.username}</Link>
                    }
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      );
    }

    return results;
  };

  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="searchPeople">
            <div className="searchPeople__searchBar">
              <Input.Search
                placeholder="Type something..."
                onSearch={onSearch}
                enterButton
              />
              <FilterOutlined style={{ fontSize: "2rem" }} onClick={filter} />
            </div>

            {!loading ? (
              renderResult()
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "90vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            )}
          </div>

          <Modal
            title="Filter"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form>
              <Form.Item
                label="Gender"
                name="gender"
                initialValue={filterData.gender}
                onChange={(e) => setFilterData(e.target.value)}
              >
                <Radio.Group>
                  <Radio.Button value={0}>Male</Radio.Button>
                  <Radio.Button value={1}>Female</Radio.Button>
                  <Radio.Button value={2}>Other</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Age" name="age">
                <DatePicker.RangePicker
                  picker="year"
                  onChange={(date, dateString) =>
                    setFilterData({ ...filterData, age: dateString })
                  }
                />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <CountryDropdown
                  value={filterData.country}
                  onChange={(val) =>
                    setFilterData({ ...filterData, country: val })
                  }
                  className="locationSelect"
                />
                <RegionDropdown
                  country={filterData.country}
                  value={filterData.region}
                  onChange={(val) =>
                    setFilterData({ ...filterData, region: val })
                  }
                  className="locationSelect"
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={() => setFilterData(initialFilterValue)}
            >
              Clear
            </Button>
          </Modal>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default SearchPeople;
