import React, { Component } from 'react';
import JSONViewer from 'react-json-viewer';
import { Helmet } from 'react-helmet';
import './index.css'; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:9999/api/fetchSms')
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="container">
        <Helmet>
          <title>Millenium SMS - Home</title> 
        </Helmet>
        <h1 className="title">Millenium SMS</h1>
        <div className="json-viewer-container">
          <JSONViewer json={data} />
        </div>
      </div>
    );
  }
}
