import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useMMKVString } from "react-native-mmkv";

import { t, ThemeContext } from "../../contexts/SettingsContexts/ThemeContext";

const update = {
  updateKey: "2.5.0-1",
  title: "Update",
  subtitle: "Here's what's new in this update",
  features: [
    {
      title: "Text Filtering",
      description:
        "You can now filter posts and comments by text. To add a filter, go to Settings => General => Filters => Text Filter List.",
    },
    {
      title: "Open in Hydra Shortcut",
      description:
        "You can now add a shortcut to open links in Hydra directly from the share sheet of any other app. To add this shortcut, go to Settings => General => Open in Hydra => Get Hydra Shortcut.",
    },
    {
      title: "Open Clipboard Links",
      description:
        "Hydra can now open links copied to your clipboard. To enable this setting, go to Settings => General => Open Clipboard Links. To prevent iOS from asking you for permission every time, go to the iOS Settings App => Apps => Hydra => Paste from Other Apps and change the setting to Allow. This setting is disabled by default due to the default iOS setting being set to Ask.",
    },
    {
      title: "User Flairs in Comments",
      description:
        "User flairs are now displayed in comments. To turn this off, go to Settings => Appearance => Show Flairs.",
    },
    {
      title: "Faster Post Loading",
      description:
        "Clicking on a post with a large comment section now loads significantly faster.",
    },
    {
      title: "Inline Comment Images",
      description:
        "Hydra now displays comment images and gifs inline with the text instead of as a link.",
    },
    {
      title: "Collapsed AutoModerator",
      description:
        "AutoModerator comments are now collapsed by default. To turn this off, go to Settings => Appearance, Collapse AutoModerator.",
    },
  ],
  bugfixes: [
    {
      description:
        "Inline images in comments are now clickable and will open in fullscreen",
    },
    {
      description: "Posts with multiple gifs will now display all gifs",
    },
  ],
};

export default function UpdateInfo() {
  const { theme } = useContext(ThemeContext);

  const [lastSeenUpdate, setLastSeenUpdate] = useMMKVString("lastSeenUpdate");

  const exitUpdateInfo = () => {
    setLastSeenUpdate(update.updateKey);
  };

  return (
    lastSeenUpdate !== update.updateKey && (
      <>
        <View style={styles.updateInfoContainer}>
          <View
            style={t(styles.updateInfoSubContainer, {
              backgroundColor: theme.tint,
            })}
          >
            <TouchableOpacity
              style={t(styles.exitButton, {
                backgroundColor: theme.verySubtleText,
              })}
              onPress={() => exitUpdateInfo()}
            >
              <FontAwesome6 name="xmark" size={16} color={theme.subtleText} />
            </TouchableOpacity>
            <Text
              style={t(styles.title, {
                color: theme.text,
              })}
            >
              {update.title}
            </Text>
            <Text
              style={t(styles.subtitle, {
                color: theme.subtleText,
              })}
            >
              {update.subtitle}
            </Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 20, gap: 20 }}>
              <Text
                style={t(styles.heading, {
                  color: theme.text,
                })}
              >
                🚀 Features
              </Text>
              {update.features.map((feature) => (
                <View key={feature.title}>
                  <Text
                    style={t(styles.featureTitle, {
                      color: theme.text,
                    })}
                  >
                    • {feature.title}
                  </Text>
                  <Text
                    style={t(styles.featureDescription, {
                      color: theme.subtleText,
                    })}
                  >
                    {feature.description}
                  </Text>
                </View>
              ))}
              <Text
                style={t(styles.heading, {
                  color: theme.text,
                })}
              >
                🐛 Bugfixes
              </Text>
              {update.bugfixes.map((bugfix) => (
                <View key={bugfix.description}>
                  <Text
                    style={t(styles.bugfixDescription, {
                      color: theme.text,
                    })}
                  >
                    • {bugfix.description}
                  </Text>
                </View>
              ))}
              <View style={styles.helpContainer}>
                <View style={styles.helpIcon}>
                  <Image
                    source={require("../../assets/images/subredditIcon.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
                <Text
                  style={t(styles.helpItem, {
                    color: theme.text,
                  })}
                >
                  If you have any feature requests, you can submit them on
                  /r/HydraFeatureRequests which can be found in the settings tab
                </Text>
              </View>
              <View style={styles.helpContainer}>
                <View style={styles.helpIcon}>
                  <FontAwesome name="github" size={22} color={theme.text} />
                </View>
                <Text
                  style={t(styles.helpItem, {
                    color: theme.text,
                  })}
                >
                  If you have any familiarity with React Native and want to
                  help, you can make a pull request at
                  https://github.com/dmilin1/hydra
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          style={styles.background}
          onPress={() => exitUpdateInfo()}
        />
      </>
    )
  );
}

const styles = StyleSheet.create({
  updateInfoContainer: {
    position: "absolute",
    top: 0,
    zIndex: 2,
    marginTop: Dimensions.get("window").height * 0.2,
    flex: 1,
    justifyContent: "center",
    maxHeight: Dimensions.get("window").height * 0.6,
    maxWidth: Dimensions.get("window").width - 40,
    alignSelf: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    opacity: 0.7,
    zIndex: 1,
  },
  updateInfoSubContainer: {
    borderRadius: 10,
    borderWidth: 1,
  },
  exitButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    top: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 20,
  },
  featureTitle: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  featureDescription: {
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 32,
  },
  bugfixDescription: {
    fontSize: 14,
    marginHorizontal: 20,
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 20,
  },
  helpIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  helpItem: {
    marginTop: 5,
    fontSize: 14,
    marginHorizontal: 20,
  },
});
