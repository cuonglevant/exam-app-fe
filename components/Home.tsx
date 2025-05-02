import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const result_icon = require("assets/result-icon.png");
const info_icon = require("assets/info-icon.png");
const score_icon = require("assets/score-icon.png");
const statistic_icon = require("assets/statistic-icon.png");
const review_icon = require("assets/review-icon.png");

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Result")}>
            <Image source={result_icon}/>
            <Text>Đáp án</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Score")}>
            <Image source={result_icon}/>
            <Text>Chấm Bài</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Review")}>
            <Image source={result_icon}/>
            <Text>Xem lại</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Statistic")}>
            <Image source={result_icon}/>
            <Text>Thống kê</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Info")}>
            <Image source={result_icon}/>
            <Text>Thông tin</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
