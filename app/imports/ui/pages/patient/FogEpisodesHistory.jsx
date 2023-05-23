import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import '../../styles/HomeMedic.css';
import { Layout, Button, Card, Space, Table, Modal, Popconfirm, Form, InputNumber, DatePicker } from 'antd';
import utc from 'dayjs/plugin/utc';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const dayjs = require('dayjs');

dayjs.extend(utc);

const { Content } = Layout;

const FogEpisodesHistory = () => {
  const location = useLocation();
  const { _id = undefined, name = undefined, surname = undefined } = location.state?.patient ?? {};
  const personalId = _id ?? JSON.parse(localStorage.getItem('user'))._id;
  const [fogEpisodes, setFogEpisodes] = useState([]);
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
  const getFogEpisodes = (patientId) => {
    Meteor.call('getFogEpisodes', patientId, (_, result) => {
      setFogEpisodes(result); // Store the fetched data in the state variable
    });
  };

  useEffect(() => {
    getFogEpisodes(personalId); // Fetch the patient list when the component mounts
  }, []);

  const upsertFogEpisode = (body) => {
    const { length, distance, frequency, intensity } = body;
    let { episodedate } = body;
    episodedate = dayjs.utc(episodedate).format();
    const episode = {
      id: modalTask._id,
      patient: personalId,
      length: length,
      distance: distance,
      frequency: frequency,
      intensity: intensity,
      episodedate: episodedate,
    };
    Meteor.call('upsertFogEpisode', episode, () => {
      setOpen(false);
      setModalTaskId({});
      getFogEpisodes(personalId);
    });
  };

  const editFogEpisode = (episode) => {
    setModalTaskId(episode);
    setModalState('Modifica');
    form.resetFields();
    setOpen(true);
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
          {localStorage.getItem('role') === 'medic'
            ? (
              <Content>
                {name} {surname}
              </Content>
            )
            : ''}
          {localStorage.getItem('role') === 'patient'
            ? (
              <Button type="primary" onClick={showModal}>
                Aggiungi Episodio di FoG
              </Button>
            )
            : ''}
          <Table
            columns={[
              {
                title: 'Durata Episodio (s)',
                dataIndex: 'length',
              },
              {
                title: 'Lunghezza di Passo (m)',
                dataIndex: 'distance',
              },
              {
                title: 'Frequenza di Passo (Hz)',
                dataIndex: 'frequency',
              },
              {
                title: 'Indice di Freezing',
                dataIndex: 'intensity',
              },
              {
                title: 'Orario Accaduto',
                dataIndex: 'episodedate',
                render: (_, record) => `${dayjs(record.episodedate).format('DD/MM/YYYY HH:mm:ss')}`, // just for decoration
              },
              {
                render: (_, episode) => (
                  <Content>
                    {localStorage.getItem('role') === 'patient'
                      ? (
                        <Space size="middle">
                          <Button key="delete" type="primary" danger>
                            <Popconfirm title="Sei sicuro di voler eliminare questo episodio?" onConfirm={() => deleteFogEpisode(episode._id)}>
                              Elimina
                            </Popconfirm>
                          </Button>
                          <Button key="edit" type="primary" onClick={() => editFogEpisode(episode)}>
                            Modifica
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
            title={state}
            onCancel={handleCancel}
            centered
            footer={[
            ]}
          >
            <Form
              name="form"
              form={form}
              className="fog-form"
              onFinish={upsertFogEpisode}
            >
              <Form.Item
                name="length"
                label="Durata Episodio (s)"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la durata in secondi dell\'episodio',
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                name="distance"
                label="Lunghezza di Passo (m)"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la lunghezza di passo',
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                name="frequency"
                label="Frequenza di Passo (Hz)"
                rules={[
                  {
                    required: true,
                    message: 'Inserisci la frequenza di passo',
                  },
                ]}
              >
                <InputNumber min={1} />
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
              <Form.Item
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
                <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  {state} Episodio
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
