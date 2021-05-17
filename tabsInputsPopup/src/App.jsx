import React from 'react'
import './App.css'
import TabOne from './TabOne'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0,
    }
  }


  handleTabClick = (key) => {
    this.setState({activeTabIndex: key})
  }

  render() {
    return (
      <div className="tabsWrapper">
        <div className="tabs">
          <div
            className={this.state.activeTabIndex === 0 ? "tab active" : "tab"}
            onClick={() => this.handleTabClick(0)}>tab1</div>
          <div
            className={this.state.activeTabIndex === 1 ? "tab active" : "tab"}
            onClick={() => this.handleTabClick(1)}>tab2</div>
          <div
            className={this.state.activeTabIndex === 2 ? "tab active" : "tab"}
            onClick={() => this.handleTabClick(2)}>tab3</div>
        </div>
        <div className="content">
          {this.state.activeTabIndex === 0 && <div className="content1">
            <TabOne />
          </div>}
          {this.state.activeTabIndex === 1 && <div className="content2">tab 2</div>}
          {this.state.activeTabIndex === 2 && <div className="content3">tab 3</div>}
        </div>
      </div>
    )
  }
}

export default App
