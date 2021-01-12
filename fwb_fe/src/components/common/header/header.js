import React, { Fragment } from 'react';
import styled from "styled-components";
import 'antd/dist/antd.css';
import '../../common/header/header.css';
import {Row,Col} from 'antd';
import { ThunderboltOutlined, SlidersFilled } from '@ant-design/icons';

const Button = styled.button`
    border: none;
    border-radius: 50%;
    background-color: white;
`;

function Header() {

    const onRandom = () => {
        alert(1);
    }
    const onSettingFrofileUser = () => {
        alert(2);
    }

    return(
    <>
    <Row>
                    <Col span={8}>
                    <Button onClick={onRandom}>
                    <ThunderboltOutlined style={{color: '#FF1493'}} />
                    </Button>
                    </Col>
                    <Col span={8}>People near you</Col>
                    <Col span={8}>
                        <Button onClick={onSettingFrofileUser}>
                            <SlidersFilled style={{color: '#FF1493'}} />
                        </Button>
                    </Col>
                </Row>
    </>
    );
}

export default Header;