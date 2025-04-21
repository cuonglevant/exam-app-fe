import { Link, Stack } from "expo-router";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const dap_an_icon = require("../assets/images/dap-an-icon.png");
const cham_bai_icon = require("../assets/images/cham-bai-icon.png");
const xem_lai_icon = require("../assets/images/xem-lai-icon.png");
const thong_ke_icon = require("../assets/images/thong-ke-icon.png");
const thong_tin_icon = require("../assets/images/thong-tin-icon.png");

export default function Index() {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Exam App",
          headerStyle: { backgroundColor: Colors.green },
          headerTintColor: Colors.beige,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
      <View>
        <View>
          <Link href="/answer" asChild>
            <TouchableOpacity>
              <Image source={dap_an_icon}/>
              <Text>Đáp án</Text>
              <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
            </TouchableOpacity>
          </Link>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={cham_bai_icon}/>
            <Text>Chấm bài</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={xem_lai_icon}/>
            <Text>Xem lại</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={thong_ke_icon}/>
            <Text>Thống kê</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={thong_tin_icon}/>
            <Text>Thông tin</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.green}/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
