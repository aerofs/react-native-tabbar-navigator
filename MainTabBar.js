'use strict';

var React = require('react-native');
var {
  Component,
  TabBarIOS
} = React;


class MainTabBar extends Component {
  constructor(props) {
    super(props);
    this.tabBarData = [];
    this.state = {
      selectedTab: 0
    };
  }

  componentWillMount() {
    this.configureTabBar();
  }

  configureTabBar() {
    var defaultTabIndex = 1;
    React.Children.map(this.props.initialConfig, function(eachChild, index) {
      var eachTabBarData = {
        id: index,
        title: eachChild.props.title,
        icon: eachChild.props.icon,
        component: eachChild.props.children
      };
      this.tabBarData.push(eachTabBarData);

      if (eachChild.props.defaultTab) {
        defaultTabIndex = index;
      }
    }.bind(this));
    this.setState({
      selectedTab: defaultTabIndex
    });
  }

  switchTab(tabId, tabTitle, currentTabIndex) {
    this.setState({
      selectedTab: tabId
    });
  }

  renderTabBarItems() {
    var items = [];
    var self = this;
    for (var i = 0; i < this.tabBarData.length; i++) {
      var eachData = this.tabBarData[i];
      var eachComponent = React.cloneElement(eachData.component, {
        navigator: this.props.navigator,
      });
      items.push(
        <TabBarIOS.Item
          title={eachData.title}
          icon={eachData.icon}
          selected={self.state.selectedTab === eachData.id}
          onPress={self.switchTab.bind(self, eachData.id, eachData.title, i)}>
          {eachComponent}
        </TabBarIOS.Item>
      );
    }
    return items;
  }

  render() {
    return (
      <TabBarIOS
        style={{flex: 1}}
        tintColor={this.props.tintColor}
        barTintColor={this.props.backgroundColor}>
        {this.renderTabBarItems()}
      </TabBarIOS>
    );
  }
}

module.exports = MainTabBar;