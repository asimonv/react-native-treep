import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";

import StatModal from "../components/StatModal";
import StatsView from "../components/StatsView";
import HeaderCard from "../components/HeaderCard";
import Layout from "../styles/Layout";
import { votesOptions } from "../data/courseOptions";
import { fetchCourseStats, courseSendStat } from "../actions/courseActions";
import { sendStat } from "../actions/userActions";
import checkIfVoted from "../helpers/votes";

export class CourseScreen extends React.Component {
  static navigationOptions = {
    title: "Course"
  };

  constructor(props) {
    super(props);
    this.state = {
      data: votesOptions,
      interactedBefore: false
    };
    this._onPress = this._onPress.bind(this);
    this._onButtonPressed = this._onButtonPressed.bind(this);
  }

  componentDidMount() {
    const { course, dispatch } = this.props;
    const {
      selectedCourse: { id }
    } = course;
    dispatch(fetchCourseStats({ courseId: id }));
  }

  _onPress(stat) {
    const {
      course: { selectedCourse },
      votes
    } = this.props;
    const { id } = selectedCourse;
    const {
      meta: { repr }
    } = stat;
    const data = { courseId: id, voteType: repr };
    this.setState(
      {
        selectedStat: stat,
        interactedBefore: checkIfVoted(data, votes)
      },
      () => {
        this.refs.modal.openModal();
      }
    );
  }

  _onButtonPressed(stat) {
    const {
      course: {
        selectedCourse: { id }
      },
      showNotification,
      dispatch
    } = this.props;
    const data = { ...stat, courseId: id };
    dispatch(sendStat(data));
    dispatch(courseSendStat(data));
    this.refs.modal.closeModal();
    /*showNotification({
        title: "Thank you!",
        message: "Your opinion is very important to others",
        onPress: () => Alert.alert("Alert", "You clicked the notification!")
      });
      */
  }

  render() {
    const { course, votes } = this.props;
    const { selectedCourse, fetchingStats } = course;
    const { data, selectedStat, interactedBefore } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <HeaderCard
            title={`${selectedCourse.courseNumber} - ${selectedCourse.name}`}
            description={selectedCourse.description}
            containerStyle={{
              marginHorizontal: Layout.container.margin,
              marginVertical: Layout.container.margin * 2
            }}
          />
          {fetchingStats ? (
            <Text style={{ marginHorizontal: Layout.container.margin }}>
              Loading <AnimatedEllipsis />
            </Text>
          ) : (
            <StatsView
              onPress={this._onPress}
              stats={course.stats}
              votes={votes}
              parent={selectedCourse}
              style={{ marginHorizontal: Layout.container.margin }}
            />
          )}
        </ScrollView>
        {selectedStat && (
          <StatModal
            title={course.selectedCourse.name}
            headerType={"vertical"}
            data={data}
            stat={selectedStat}
            ref={"modal"}
            interactedBefore={interactedBefore}
            onButtonPressed={this._onButtonPressed}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  course: state.course,
  votes: state.user.votes
});

export default connect(mapStateToProps)(CourseScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
