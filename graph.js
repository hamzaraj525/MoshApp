import React, {Component} from 'react';
import {View, StyleSheet, Text, SectionList, FlatList} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
export default class graph extends Component {
  constructor(props) {
    setTimeout(() => {
      this.props.navigation.navigate('FireBaseLogin');
    }, 3000);
    super(props);
  }
  render() {
    const chartConfig = {
      backgroundGradientFrom: 'red',
      backgroundGradientFromOpacity: 18,
      backgroundGradientTo: 'blue',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };
    const data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
      datasets: [
        {
          data: [2, 45, 28, 80, 99, 43],
        },
      ],
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={data}
          width={300}
          height={256}
          verticalLabelRotation={11}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  del: {
    width: '20%',
    borderRadius: 15,
    height: '122%',
    backgroundColor: '#FF1493',
  },

  header: {
    backgroundColor: 'blue',
  },
  icon: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 11,
  },
  flatListStyle: {
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 8,
    marginBottom: 17,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  store: {
    fontSize: 32,
    alignItems: 'center',
  },
  loginText: {
    alignItems: 'center',
  },
});
