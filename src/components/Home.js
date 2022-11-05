import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Popconfirm, Space, Form, Input } from "antd";
import { Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';
import './task.css';


const Home = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState("");
    const [sortedInfo, setSortedInfo] = useState({});
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    let [filteredInfo, setFilteredInfo] = useState({});
    let [filteredData] = useState();
  
    
    useEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://sheltered-sea-10901.herokuapp.com/products"
      );
      setGridData(response.data);
      setLoading(false);
    };
   
  
  
    const handleDelete = (value) => {
      const dataSource = [...modifiedData];
      const filteredData = dataSource.filter((item) => item.id !== value.id);
      setGridData(filteredData);
    };
  
    const modifiedData = gridData.map(({ body, ...item }) => ({
      ...item,
      key: item.id,
      comment: isEmpty(body) ? item.comment : body,
    }));
  
    console.log("modifiedData", modifiedData);
  
    const getColumnSearchProps = (dataIndex) => ({
     
    });
  
   
    const edit = (record) => {
      form.setFieldsValue({
        product_name: "",
        category_name: "",
        description: "",
        created_by: "",
        status: "",
        created_at: "",
        updated_at: "",
        ...record,
      });
      setEditingKey(record.key);
    };
  
    const cancel = () => {
      setEditingKey("");
    };
  
    const handleChange = (_, filters, sorter) => {
      console.log("sorter", sorter);
      console.log("filters", filters);
      const { order, field } = sorter;
      setFilteredInfo(filters);
      setSortedInfo({ columnKey: field, order });
    };
  
    console.log("filteredInfo", filteredInfo);
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...modifiedData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setGridData(newData);
          setEditingKey("");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
  
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      record,
      children,
      ...restProps
    }) => {
      const input = <Input />;
      return (
        <td  {...restProps}>
          {editing ? (
            <Form.Item 
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please input ${title}`,
                },
              ]}
            >
              {input}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Name",
        dataIndex: "product_name",
        align: "center",
        editable: true,
        sorter: (a, b) => a.product_name.length - b.product_name.length,
        sortOrder: sortedInfo.columnKey === "product_name" && sortedInfo.order,
        ...getColumnSearchProps("product_name"),
      },
      {
        title: "Category",
        dataIndex: "category_name",
        align: "center",
        editable: true,
        sorter: (a, b) => a.category_name.length - b.category_name.length,
        sortOrder: sortedInfo.columnKey === "category_name" && sortedInfo.order,
        ...getColumnSearchProps("category_name"),
      },
      {
        title: "Description",
        dataIndex: "description",
        align: "center",
        editable: true,
        sorter: (a, b) => a.description.length - b.description.length,
        sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
        ...getColumnSearchProps("description"),
      },
     
      {
        title: "Created By",
        dataIndex: "created_by",
        align: "center",
        editable: true,
        sorter: (a, b) => a.created_by.length - b.created_by.length,
        sortOrder: sortedInfo.columnKey === "created_by" && sortedInfo.order,
        ...getColumnSearchProps("created_by"),
      },
      {
        title: "Status ",
        dataIndex: "status",
        align: "center",
        editable: true,
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
        ...getColumnSearchProps("status"),
      },
      {
        title: "Created At ",
        dataIndex: "created_at",
        align: "center",
        editable: true,
        sorter: (a, b) => a.created_at.length - b.created_at.length,
        sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
        ...getColumnSearchProps("created_at"),
      },
      {
        title: "Updated At ",
        dataIndex: "updated_at",
        align: "center",
        editable: true,
        sorter: (a, b) => a.updated_at.length - b.updated_at.length,
        sortOrder: sortedInfo.columnKey === "updated_at" && sortedInfo.order,
        ...getColumnSearchProps("updated_at"),
      },
      
  
      {
        title: "Actions",
        dataIndex: "actions",
        align: "center",
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space >
             
              {editable ? (
                <span>
                  <Space size="middle">
                    <Button
                      onClick={(e) => save(record.key)}
                      type="primary"
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                      <Button>Cancel</Button>
                    </Popconfirm>
                  </Space>
                </span>
              ) : (
                <Button className="edit" onClick={() => edit(record)}  >
                  Edit
                </Button >
              )}
               <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record)}
              >
                <Button className="delete"  disabled={editable} >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          ) : null;
        },
      },
    ];
  
    const isEditing = (record) => {
      return record.key === editingKey;
    };
  
   
  
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
  
    const handleSearch = (e) => {
      setSearchText(e.target.value);
      if (e.target.value === "") {
        loadData();
      }
    };
    const globalSearch = () => {
      filteredData = modifiedData.filter((value) => {
        return (
          value.product_name.toLowerCase().includes(searchText.toLowerCase()) ||
          value.category_name.toLowerCase().includes(searchText.toLowerCase()) ||
          value.description.toLowerCase().includes(searchText.toLowerCase()) ||
          value.created_by.toLowerCase().includes(searchText.toLowerCase()) ||
          value.status.toLowerCase().includes(searchText.toLowerCase()) ||
          value.created_at.toLowerCase().includes(searchText.toLowerCase()) ||
          value.updated_at.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setGridData(filteredData);
    };
  
    return (
        <>
        <div className="container1">
        <div className="container" >   
        <div className=" item-1">
          <Link className="new"  to ="/add" >          
          <Button  type="primary" success>
          Add New Product
          </Button>
          </Link>
          </div>
          <div className=" item-2">
        <Space className="search" style={{ marginBottom: 16 }}>
          <Input 
            placeholder="Enter Search Text"
            onChange={handleSearch}
            type="text"
            allowClear
            value={searchText}
          />
          <Button  type="primary" onClick={globalSearch}>
            Search
          </Button>
        </Space>
      </div>
      
        <Form form={form} component={false}>
        <div className=" item-3">
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            columns={mergedColumns}
            dataSource={
              filteredData && filteredData.length ? filteredData : modifiedData
            }
            bordered
            loading={loading}
            onChange={handleChange}
          />
          </div>
        </Form>
        
      </div>
      </div>
      </>
    );
  };
  
  export default Home;
  