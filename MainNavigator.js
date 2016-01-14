'use strict';

var React = require('react-native');

var {
  Component,
  View,
  Navigator,
} = React;

var MainTabBar = require('./MainTabBar');

class TabBarNavigator extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var newComponent = React.cloneElement(route.component, {
      navigator: navigator,
    });

    return newComponent;
  }

  render() {
    var initialRoute = {
      title: '',
      isRoot: true,
      component: (
        <MainTabBar {...this.props} initialConfig={this.props.children} onChange={this.props.onChange}/>
      )
    };
    return (
      <Navigator
        ref='navigator'
        style={[{flex: 1}, {backgroundColor: 'transparent'}]}
        initialRoute={initialRoute}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }
}

class TabBarNavigatorItem extends Component {
  render() {
    return <View/>;
  }
}

TabBarNavigator.Item = TabBarNavigatorItem;

module.exports = TabBarNavigator;
