import React from 'react'
import { Table } from 'antd';
import userIcon from "../../../assets/images/userIcon.svg"
function ActivityTable() {
    const columns = [
        {
            title: "Sr No",
            dataIndex: "srNo",
            key: "srNo",
        },
        {
            title: "MARKET",
            dataIndex: "market",
            key: "market",
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
        },
        {
            title: "Bought",
            dataIndex: "bought",
            key: "bought",
        },
        {
            title: "Bet",
            dataIndex: "bet",
            key: "bet",
        },
        {
            title: "Date & Time",
            dataIndex: "dateTime",
            key: "dateTime",
        },
    ];

    const data = [
        {
            key: "1",
            srNo: "01",
            market: 'Bitcoin to be priced...10:00 AM? ',
            user: <span className='userIcon'> <img src={userIcon} alt="userIcon" />Josh</span>,
            bought: <span className='green'>Yes</span>,
            bet: '100 Azero',
            dateTime: 'Mon, 10th-April-24 | 07:00 PM',
        },
        {
            key: "2",
            srNo: "02",
            market: 'Bitcoin to be priced...10:00 AM? ',
            user: <span className='userIcon'> <img src={userIcon} alt="userIcon" />Josh</span>,
            bought: <span className='red'>No</span>,
            bet: '100 Azero',
            dateTime: 'Mon, 10th-April-24 | 07:00 PM',
        },
        {
            key: "3",
            srNo: "03",
            market: 'Bitcoin to be priced...10:00 AM? ',
            user: <span className='userIcon'> <img src={userIcon} alt="userIcon" />Josh</span>,
            bought: <span className='green'>Yes</span>,
            bet: '100 Azero',
            dateTime: 'Mon, 10th-April-24 | 07:00 PM',
        },
        {
            key: "4",
            srNo: "04",
            user: <span className='userIcon'> <img src={userIcon} alt="userIcon" />Josh</span>,
            market: 'Bitcoin to be priced...10:00 AM? ',
            bought: <span className='green'>Yes</span>,
            bet: '100 Azero',
            dateTime: 'Mon, 10th-April-24 | 07:00 PM',
        },
        {
            key: "5",
            srNo: "05",
            market: 'Bitcoin to be priced...10:00 AM? ',
            user: <span className='userIcon'> <img src={userIcon} alt="userIcon" />Josh</span>,
            bought: <span className='green'>Yes</span>,
            bet: '100 Azero',
            dateTime: 'Mon, 10th-April-24 | 07:00 PM',
        },

    ];
    return (

        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="commontable"
            overflow="auto"
        />
    )
}

export default ActivityTable