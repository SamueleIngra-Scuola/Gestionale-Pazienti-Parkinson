import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../styles/HomeMedic.css';
import { FileOutlined, UserOutlined, FolderOpenOutlined, ToolOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button,
  Card,
  Space,
  Table,
  Modal,
  Popconfirm,
  Form,
  Input,
  InputNumber,
  DatePicker } from 'antd';
import utc from 'dayjs/plugin/utc';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

dayjs.extend(utc);

const { Content, Footer, Sider } = Layout;

const TherapiesHistory = () => {
  const location = useLocation();
  const { _id = undefined, name = undefined, surname = undefined } = location.state?.patient ?? {};
  const personalId = _id ?? JSON.parse(localStorage.getItem('user'))._id;
  const [therapies, setTherapies] = useState([]);
  const [state, setModalState] = useState('Crea');
  const [modalTask, setModalTaskId] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    form.resetFields();
    setModalState('Crea');
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getTherapiesHistory = (patientId) => {
    Meteor.call('getTherapiesHistory', patientId, (_, result) => {
      setTherapies(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getTherapiesHistory(personalId); // Fetch the patient list when the component mounts
  }, []);

  const upsertTherapy = (body) => {
    const { drug, dosage } = body;
    let { prescriptiondate } = body;
    prescriptiondate = dayjs.utc(prescriptiondate).format();
    console.log(personalId);
    const therapy = {
      id: modalTask._id,
      patient: personalId,
      drug: drug,
      dosage: dosage,
      prescriptiondate: prescriptiondate,
    };
    Meteor.call('upsertTherapy', therapy, () => {
      setOpen(false);
      setModalTaskId({});
      getTherapiesHistory(personalId);
    });
  };

  const editTherapy = (therapy) => {
    setModalTaskId(therapy);
    console.log(therapy);
    setModalState('Modifica');
    form.resetFields();
    form.setFields([{
      length: modalTask.length,
      distance: modalTask.distance,
      frequency: modalTask.frequency,
      intensity: modalTask.intensity,
      therapydate: modalTask.therapydate,
    }]);
    setOpen(true);
  };

  const deleteTherapy = (therapyId) => {
    Meteor.call('deleteTherapy', therapyId, (err) => {
      setOpen(false);
      getTherapiesHistory(personalId);
    });
  };

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Storico Terapie">
          {localStorage.getItem('role') === 'medic'
            ? (
              <Content>
                {name} {surname}
              </Content>
            )
            : ''}
          {localStorage.getItem('role') === 'medic'
            ? (
              <Button type="primary" onClick={showModal}>
                Aggiungi Terapia
              </Button>
            )
            : ''}
          <Table
            columns={[
              {
                title: 'Medicinale',
                dataIndex: 'drug',
              },
              {
                title: 'Dosaggio',
                dataIndex: 'dosage',
              },
              {
                title: 'Data di Prescrizione',
                dataIndex: 'prescriptiondate',
                render: (_, record) => `${dayjs(record.prescriptiondate).format('DD/MM/YYYY')}`, // just for decoration
              },
              {
                render: (_, therapy) => (
                  <Content>
                    {localStorage.getItem('role') === 'medic'
                      ? (
                        <Space size="middle">
                          <Button key="delete" type="primary" danger>
                            <Popconfirm title="Sei sicuro di voler eliminare questa terapia?" onConfirm={() => deleteTherapy(therapy._id)}>
                              Elimina
                            </Popconfirm>
                          </Button>
                          <Button key="edit" type="primary" onClick={() => editTherapy(therapy)}>
                            Modifica
                          </Button>
                        </Space>
                      )
                      : ''}
                  </Content>
                ),
              },
            ]}
            dataSource={therapies}
          />
          <Modal
            className="Modal"
            open={open}
            title={state}
            onCancel={handleCancel}
            centered
            footer={[
            ]}
          >
            <Form
              name="form"
              form={form}
              className="therapy-form"
              onFinish={upsertTherapy}
            >
              <Form.Item
                name="drug"
                label="Medicinale"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci il nome del medicinale da prescrivere',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dosage"
                label="Dosaggio (mg)"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci il dosaggio del medicinale',
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                name="prescriptiondate"
                label="Data di Prescrizione"
                rules={[
                  {
                    type: 'date',
                    message: 'The input is not valid date',
                  },
                  {
                    required: true,
                    message: 'Per favore inserisci la data di prescrizione della terapia',
                  },
                ]}
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  {state} Terapia
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </Content>
    </Layout>
  );
};
export default TherapiesHistory;
