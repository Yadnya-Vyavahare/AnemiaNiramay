# AnemiaNiramay

<h2>Steps to access the files</h2>
<h4>Server.js</h4>
 <p>
  1) It has MySQL Database connectivity<br>
  2) All APIs with SQL queries are written here.
 </p>
<h4>Config.js</h4>
<p>It has public IP address and port number required for API URL </p>
<h4>SQL Query file</h4>
<p>All quieries required to make Database are provided</p>


<h2>Installation</h2>

<h3>Install android studio</h3>
<p>Follow this link to set up emulator: <br>
https://reactnative.dev/docs/environment-setup<br>
No need to install chocolaty if node version is greater than 16<br>
Java version is 17.0.9<br>
</p>

<h3>To install dependencies</h3>

<p>npm i react-native-vector-icons
npm i react-native-svg<br>
npm i react-native-screens<br>
npm i react-native-safe-area-context<br>
npm i react-native-paper<br>
npm i react-native-modal-datetime-picker<br>
npm i react-native-gesture-handler<br>
npm i  @react-navigation/drawer<br>
npm i react-native-chart-kit<br>
npm i axios<br>
npm i  @react-native-community/datetimepicker<br>
npm i  @react-navigation/native-stack<br>
npm i  @react-navigation/native<br>
npm i react-native-reanimated<br>
npm i react-native-phone-call<br>
npm i react-native-email<br>  
npm i react-native-html-to-pdf<br>
npm i react-native-picker-select<br>
npm i react-native-responsive-fontsize<br>
npm i react-native-responsive-screen<br>
npm i react-native-share<br>
npm i metro-react-native-babel-preset<br>
npm i react-native-view-shot<br>
npm i react-native-picker-select<br>
npm i @react-native-community/checkbox<br>
npm i react-native-fs<br>
npm i rn-fetch-blob<br>
npm i victory-native@36.6.12<br>
npm i react-native-print<br>
npm i @react-native-picker/picker<br>
</p>

</p>
<h3>To Generate APK File</h3>
<p>
<h4>Edit C:\Users\Admin\Desktop\A-Niramay\ANiramay\android\app\build.gradle</h4> <br>
 <p>Replace in buildTypes</p>
 debug {
            signingConfig signingConfigs.debug
        }<br>
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.<br>
            signingConfig signingConfigs.release<br>
            minifyEnabled enableProguardInReleaseBuilds<br>
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }

        <p>
        Add in last line:
        apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

                 project.ext.vectoricons = [
                     iconFontNames: [
                 'MaterialIcons.ttf',
                 'EvilIcons.ttf',
                 'FontAwesome.ttf',
                 ]
                 ]
        </p>
<br><br>
C:\Users\Admin\Desktop\A-Niramay\ANiramay\android\gradle properties <br> #add following lines:<br>hermesEnabled=true<br>
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore<br>
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias<br>
MYAPP_UPLOAD_STORE_PASSWORD=********<br>
MYAPP_UPLOAD_KEY_PASSWORD=********<br><br>
<p>Generate Keystroke and add it in  C:\Users\Admin\Desktop\A-Niramay\ANiramay\android\app</p><br>
  
  C:\Users\Admin\Desktop\Anemia\Awe\android\app\src\main\res\xml  --> network_security_config.xml (file path) <br>
  C:\Users\Admin\Desktop\Anemia\Awe\android\app\src\main\assets  --> index.android.bundle <br>

  <p>Make following changes in the AndroidManifest file</p><br>
  C:\Users\Admin\Desktop\Anemia\Awe\android\app\src\main\AndroidManifest <br>
  1) android:networkSecurityConfig="@xml/network_security_config" <br>
  2) android:usesCleartextTraffic="true" <br>
</p>

<h4> Command to build the apk </h4>
 <p> 
  1) ./gradlew clean<br>
  2) ./gradlew assembleRelease<br>
 </p>

 <h4>To reset metro</h4>
 <p>
   1) npm install react-native@latest<br>
   2) npm install <br>
   3) npx react-native clean<br>
   4) npx react-native start --reset-cache<br>
 </p>
>>>>>>> 52ec60cbb655c273fdb37c22c7ad96da2a1be3fb
