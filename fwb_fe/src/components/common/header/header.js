import React, { Fragment, useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import "../../common/header/header.css";
import { CountryDropdown } from 'react-country-region-selector';
import {Row,Col, Drawer,Slider, Form,Collapse} from 'antd';
import { SettingOutlined, SlidersFilled } from "@ant-design/icons";

// import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background-color: white;
`;

const ButtonSubmit = styled.button`
    background-color: #ff2e68;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 7%;
`;

function formatterKilometer(value) {
    return `${value}Km`;
  }

const { Panel } = Collapse;

function Header() {

    const [active,setActive] = useState("grey");

    const remoteData = {
        url: 'https://trial.mobiscroll.com/content/countries.json',
        type: 'json'
    };

    const [visible,setVisible] = useState(false);

    const onShowDrawer = () => {
            setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    const onChangeColor = () => {
        setActive("#ff2e68");
    }

  return (
<>
        <Row>
            <Col span={8}>
                <Button>
                    <SettingOutlined style={{color: '#FF1493'}} />
                    <Drawer
                        title="Filter People Near You"
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
                        <Form className="filter" layout="vertical" hideRequiredMark>
                            <Collapse defaultActiveKey={['1']}>
                                <Panel header="Please Choose" key="1">
                                    <p>I'm interested in</p>
                                    <div className="filter__interesting space_input">
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="men" value="Men" />
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="women" value="Women" />
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="everyone" value="Everyone" />
                                    </div>
                                    <p>I am here for</p>
                                    <div className="filter__matches--require space_input">
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="dating" value="Dating" />
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="friend" value="Friends" />
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="partner" value="Partner" />
                                        <input style={{backgroundColor: active}} onClick={onChangeColor} type="button" id="vani" value="Vani" />
                                    </div>
                                    <span>Show Age</span>
                                    <Slider className="space_input" defaultValue={18}/>
                                    <span>Distance within</span>
                                    <Slider className="space_input" tipFormatter={formatterKilometer}/>           
                                    <CountryDropdown className="space_input choice_country"
                                    value={remoteData}
                                    />
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
