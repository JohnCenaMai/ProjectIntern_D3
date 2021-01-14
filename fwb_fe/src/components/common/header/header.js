import React, { Fragment, useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import "../../common/header/header.css";
import {Row,Col, Drawer,Radio,Select, Form, Input,Collapse} from 'antd';
import { SettingOutlined, SlidersFilled } from "@ant-design/icons";

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background-color: white;
`;

const ButtonSubmit = styled.button`
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5%;
`;
const { Panel } = Collapse;

const { Option } = Select;

const { TextArea } = Input;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function Header() {

    const [visible,setVisible] = useState(false);

    const  onShowDrawer = () => {
            setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }

  return (
<>
        <Row>
            <Col span={8}>
                <Button>
                    <SettingOutlined style={{color: '#FF1493'}} />
                    <Drawer
                        title="Edit Profile Your Infomation"
                        width={500}
                        onClose={onClose}
                        visible={visible}
                        bodyStyle={{ paddingBottom: 80 }}
                        footer={<div style={{textAlign: 'right',}}>
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <ButtonSubmit onClick={onClose} type="primary">
                            Submit
                        </ButtonSubmit>
                        </div>}>
                        <Form layout="vertical" hideRequiredMark>
                            <Collapse defaultActiveKey={['1']}>
                                <Panel header="Basic info" key="1">
                                    <Input className="space_input" placeholder="Name"/>
                                    <Input className="space_input" placeholder="Email" />
                                    <Input className="space_input" placeholder="Age" />
                                    <Select className="space_input" defaultValue="a1" style={{ width: '100%' }}>
                                        {children}
                                    </Select>
                                    <Radio.Group className="space_input rdEditProfile" defaultValue="a" size="large">
                                        <Radio.Button value="a">Male</Radio.Button>
                                        <Radio.Button value="b">Female</Radio.Button>
                                        <Radio.Button value="c">Other</Radio.Button>
                                    </Radio.Group>
                                    <TextArea placeholder="About me" showCount maxLength={100} />
                                </Panel>
                                <Panel header="Hobits" key="2">
                                </Panel>
                            </Collapse>
                        </Form>
                    </Drawer>
                </Button>
            </Col>
            <Col span={8}>People near you</Col>
            <Col span={8}>
                <Button onClick={onShowDrawer}>
                    <SlidersFilled style={{color: '#FF1493'}} />
                </Button>
            </Col>
        </Row>
    </>
  );
}

export default Header;
