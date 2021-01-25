import React, { Fragment, useEffect, useState } from "react";
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
  AutoComplete,
  Button,
} from "antd";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../common/sidebar/sider";
import "./searchPeople.css";
import api from "./../../../utils/api";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const initialFilterValue = {
  username: "",
  gender: null,
  age: [null, null],
  country: "",
  region: "",
};

function SearchPeople() {
  const [filterData, setFilterData] = useState(initialFilterValue);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const filter = () => {
    setIsModalVisible(true);
  };

  const onSearch = async () => {
    if (filterData.username === "") {
      alert("Please type something!");
      return;
    }

    if (!localStorage.getItem("history").includes(filterData.username)) {
      localStorage.setItem(
        "history",
        `${localStorage.getItem("history")} ${filterData.username}`
      );
    }

    setLoading(true);

    try {
      const response = await api.get("/users/profile/search", {
        params: {
          username: filterData.username,
          gender: filterData.gender,
          fromAge: filterData.age[0],
          toAge: filterData.age[1],
          country: filterData.country,
          region: filterData.region,
        },
      });

      setSearchResult(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const deleteHistory = (title) => {
    localStorage.setItem(
      "history",
      localStorage.getItem("history").replace(title, "")
    );
  };

  const renderResult = () => {
    let results = <Empty />;
    if (searchResult.length !== 0) {
      results = (
        <div className="searchResults">
          <Typography.Title level={4}>
            Result: {searchResult.length}
          </Typography.Title>
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

  const renderTitle = (title) => {
    return <span>{title}</span>;
  };

  const renderItem = (title) => {
    return {
      value: title,
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Text
            onClick={() => setFilterData({ ...filterData, username: title })}
          >
            {title}
          </Typography.Text>

          <span onClick={() => deleteHistory(title)}>
            <CloseOutlined />
          </span>
        </div>
      ),
    };
  };

  const buildSuggestion = () => {
    if (!localStorage.getItem("history")) {
      localStorage.setItem("history", "");
    }

    let data = [];

    localStorage
      .getItem("history")
      .trim()
      .split(" ")
      .map((item) => data.push(renderItem(item)));

    return data;
  };

  const options = [
    {
      label: renderTitle("History"),
      options: buildSuggestion(),
    },
  ];

  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="searchPeople">
            <div className="searchPeople__searchBar">
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={400}
                style={{ width: "90%" }}
                options={options}
              >
                <Input.Search
                  value={filterData.username}
                  onChange={(e) =>
                    setFilterData({ ...filterData, username: e.target.value })
                  }
                  allowClear
                  placeholder="Type something..."
                  onSearch={onSearch}
                  enterButton
                />
              </AutoComplete>

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
