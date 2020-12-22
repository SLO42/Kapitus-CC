import React from 'react';
import logo from './logo.svg';
import _axios from 'axios';
import './App.css';

const axios = _axios.create({
  timeout: 10000
})

const apikey =  process.env.REACT_APP_APIKEY || "demo";
const INITAL_STATE = {
  symbol: "AAPL",
  data: undefined,
  loading: false,
  image: null,
} 


class App extends React.Component { 
  constructor(props){
    super(props);

    this.state = {
      ...INITAL_STATE
    }
  }

  _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
		  this.onSubmit(e);
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this._handleKeyDown, false);
  }

  ListStart = () => {
    return (
    <ul key={"start"}>
      {Object.keys(this.state.data).map((key, index) => (
        <this.ListItem item={key} data={this.state.data[key]} index={index} />
      )
      )}
    </ul>
  )}
  
  ListItem = ({item, data}) => {
    if (item === "changes"){
      if (data > 0){
        return (
          <li key={this.state.data[item]}>
            {item} | <span style={{color: "green"}}>{data}</span>
          </li> 
        )
      }
      else {
        return (
          <li key={this.state.data[item]}>
            {item} | <span style={{color: "red"}}>{data}</span>
          </li> 
        )
      }
    }
    else if (item === "price") {
      return (
        <li key={this.state.data[item]}>
            {item} | ${data}
        </li>
       )
    }
    else if (item === "website") {
      return (
        <li key={this.state.data[item]}>
           {item} | <a href={data} target={"_blank"} rel={"noreferrer"}>{data}</a>
        </li>
       )
    }
    else return <li key={this.state.data[item]}> {item} | {data} </li>
  }

  onSubmit = () => {
    this.setState({loading: true});
    axios.get(`https://financialmodelingprep.com/api/v3/profile/${this.state.symbol}?apikey=${this.state.symbol === "AAPL" ? "demo" : apikey}`).then(res => {
      const data = res.data[0];
      this.setState({data: data, image: data.image}, () => {
        this.setState({loading: false});
      });
      
    })
    // });
  }

  onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
  };
  
  
  

  render() {
    const {loading, symbol} = this.state;
      return (
        <div className="App">
        <header className="App-header">
          <img src={ this.state.image || logo} className="App-logo" alt="logo" />
            <input type="text" value={symbol} name={"symbol"} id={"symbol"} onChange={this.onChange}></input>
            <input type="button" onClick={this.onSubmit} value={"Submit"}></input>
            {loading ? <p>loading...</p> : this.state.data === undefined ? <p></p> :  <this.ListStart/> }
        </header>
      </div>
    );
  }
}

export default App;
