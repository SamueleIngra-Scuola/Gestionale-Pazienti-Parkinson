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
  DatePicker,
  TimePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

dayjs.extend(customParseFormat);

const { Content, Footer, Sider } = Layout;

const FogEpisodesHistory = (patient) => {
  const { id } = patient ?? undefined;
  const personalId = id ?? JSON.parse(localStorage.getItem('user'))._id;
  const [fogEpisodes, setFogEpisodes] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTask, setModalTaskId] = useState('');
  const showModal = (record) => {
    setModalTaskId(record);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getFogEpisodes = (patientId) => {
    Meteor.call('getFogEpisodes', patientId, (_, result) => {
      setFogEpisodes(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getFogEpisodes(personalId); // Fetch the patient list when the component mounts
  }, []);

  const createFogEpisode = (body) => {
    const { length, distance, frequency, intensity, episodedate } = body;
    const episode = {
      patient: personalId,
      length: length,
      distance: distance,
      frequency: frequency,
      intensity: intensity,
      episodedate: episodedate,
    };
    Meteor.call('createFogEpisode', episode, (err) => {
      setOpen(false);
      getFogEpisodes(personalId);
    });
  };

  const deleteFogEpisode = (episodeId) => {
    Meteor.call('deleteFogEpisode', episodeId, (err) => {
      setOpen(false);
      getFogEpisodes(personalId);
    });
  };

  return (
    <Layout>
      <SideBar />
      <Content>
        <Card title="Storico FoG">
          {localStorage.getItem('role') === 'patient'
            ? (
              <Button type="primary" onClick={() => showModal(patient)}>
                Aggiungi Episodio di FoG
              </Button>
            )
            : ''}
          <Table
            columns={[
              {
                title: 'Durata Episodio',
                dataIndex: 'length',
              },
              {
                title: 'Lunghezza di Passo',
                dataIndex: 'distance',
              },
              {
                title: 'Frequenza di Passo',
                dataIndex: 'frequency',
              },
              {
                title: 'Indice di Freezing',
                dataIndex: 'intensity',
              },
              {
                render: (_, episode) => (
                  <Content>
                    {localStorage.getItem('role') === 'patient'
                      ? (
                        <Space size="middle">
                          <Button key="assist" type="primary" danger>
                            <Popconfirm title="Sei sicuro di voler eliminare questo episodio?" onConfirm={() => deleteFogEpisode(episode._id)}>
                              Elimina
                            </Popconfirm>
                          </Button>
                        </Space>
                      )
                      : ''}
                  </Content>
                ),
              },
            ]}
            dataSource={fogEpisodes}
          />
          <Modal
            className="Modal"
            open={open}
            title="Crea un nuovo episodio"
            onCancel={handleCancel}
            centered
            footer={[
            ]}
          >
            <Form
              name="form"
              className="fog-form"
              initialValues={{
                remember: true,
              }}
              onFinish={createFogEpisode}
            >
              <Form.Item
                name="length"
                label="Durata Episodio"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la durata in secondi dell\'episodio',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="distance"
                label="Lunghezza di Passo"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la lunghezza di passo',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="frequency"
                label="Frequenza di Passo"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la frequenza di passo',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="intensity"
                label="Indice di Freezing"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci l\'indice di freezing',
                  },
                ]}
              >
                <InputNumber min={1} max={5} />
              </Form.Item>
              { /* <Form.Item
                name="episodedate"
                label="Orario Accaduto"
                rules={[
                  {
                    type: 'date',
                    message: 'The input is not valid date',
                  },
                  {
                    required: true,
                    message: 'Per favore inserisci l\'orario dell\'accaduto',
                  },
                ]}
              >
                <TimePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} placeholder="Orario" />
              </Form.Item> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Crea
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </Content>
    </Layout>
  );
};
export default FogEpisodesHistory;
