import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import "../Styles/Dashboard.css";
import Layout from "./Layout";
import moment from "moment";
import { DatePicker } from "antd";
const { MonthPicker, RangePicker } = DatePicker;
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaChartArea } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiSolidSave } from "react-icons/bi";
import Analytics from "./Analytics";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("all");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [editableRow, setEditableRow] = useState(null);
  const [activeList, setActiveList] = useState(true);
  const [activeComponent, setActiveComponent] = useState("table");

  const handleEdit = (record) => {
    setEditableRow(record.key);
  };

  const handleSave = async (record) => {
    console.log(record);
    try {
      const updatedTransaction = { ...record };
      setLoading(true);

      // Make PUT request to update transaction
      await axios.put(
        `http://localhost:3000/updateTransaction/${record._id}`,
        updatedTransaction
      );
      setLoading(false);
      message.success("Transaction updated successfully");
      setEditableRow(null);
      handleNewData();
    } catch (error) {
      setLoading(false);
      console.error(error, "Failed to update the transaction");
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this transaction?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        confirmDelete(record);
      },
    });
  };

  const confirmDelete = async (record) => {
    try {
      setLoading(true);
      // Make DELETE request to delete transaction
      await axios.delete(
        `http://localhost:3000/deleteTransaction/${record._id}`
      );
      setLoading(false);
      message.success("Transaction deleted successfully");
      handleNewData();
    } catch (error) {
      setLoading(false);
      console.error(error, "Failed to delete the transaction");
      message.error("Failed to delete the transaction");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        editableRow === record.key ? (
          <DatePicker
            defaultValue={moment(text)}
            onChange={(value) => (record.date = value)}
          />
        ) : (
          <span>{moment(text).format("YYYY-MM-DD")}</span>
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.amount = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) =>
        editableRow === record.key ? (
          <Select
            defaultValue={text}
            onChange={(value) => (record.type = value)}
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.category = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.reference = e.target.value)}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) =>
        editableRow === record.key ? (
          <Input
            defaultValue={text}
            onChange={(e) => (record.description = e.target.value)}
          />
        ) : (
          <span style={{ display: "block", width: "200px" }}>{text}</span>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          {editableRow === record.key ? (
            <button className="saveBtn" onClick={() => handleSave(record)}>
              <BiSolidSave />
            </button>
          ) : (
            <button className="editBtn" onClick={() => handleEdit(record)}>
              <MdModeEditOutline />
            </button>
          )}
          <button className="deleteBtn" onClick={() => handleDelete(record)}>
            <MdDelete />
          </button>
        </span>
      ),
    },
  ];

  const handleNewData = async () => {
    try {
      const user = localStorage.getItem("id");
      const res = await axios.get(
        `http://localhost:3000/getTransaction/${user}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleNewData();
  }, []);

  let filteredData = [...transactions];

  if (type !== "all") {
    filteredData = filteredData.filter(
      (transaction) => transaction.type === type
    );
  }

  if (frequency === "custom" && selectedDate.length === 2) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];

    filteredData = transactions.filter((transaction) => {
      const transactionDate = moment(transaction.date);
      return transactionDate.isBetween(startDate, endDate, null, "[]");
    });
  } else if (frequency === "7") {
    const oneWeekAgo = moment().subtract(7, "days").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneWeekAgo)
    );
  } else if (frequency === "30") {
    const oneMonthAgo = moment().subtract(1, "months").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneMonthAgo)
    );
  } else if (frequency === "365") {
    const oneYearAgo = moment().subtract(1, "years").toDate();
    filteredData = transactions.filter((transaction) =>
      moment(transaction.date).isAfter(oneYearAgo)
    );
  }

  const handleSubmit = async (values) => {
    try {
      const user = localStorage.getItem("id");
      setLoading(true);

      // Save to MongoDB
      await axios.post("http://localhost:3000/addTransaction", {
        data: values,
        id: user,
      });
      setLoading(false);

      // Update state with new transaction
      const newTransaction = { ...values, userid: user._id };
      setTransactions([...transactions, newTransaction]);

      // Save to localStorage
      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactions, newTransaction])
      );

      message.success("Transaction Added successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add the transaction");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="filters">
        <div>
          <h4>Select Frequency</h4>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="all">All Data</Select.Option>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
          </Select>
        </div>

        <div>
          <h4>Select Type</h4>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div className="analytics">
          <AiOutlineUnorderedList
            className={`listIcon ${
              activeComponent === "table" ? "active" : ""
            }`}
            onClick={() => setActiveComponent("table")}
          />
          <FaChartArea
            className={`chartIcon ${
              activeComponent === "analytics" ? "active" : ""
            }`}
            onClick={() => setActiveComponent("analytics")}
          />
        </div>

        <div>
          <button className="addnewtrans" onClick={() => setShowModal(true)}>
            Add +
          </button>
        </div>
      </div>

      <div className="content">
        {activeComponent === "table" ? (
          <Table columns={columns} dataSource={filteredData} />
        ) : (
          <Analytics transactions={transactions} />
        )}
      </div>

      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex">
            <button type="submit" className="addnewtrans">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default Dashboard;
