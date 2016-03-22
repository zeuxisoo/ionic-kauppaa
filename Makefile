all:
	@echo "make serve"
	@echo "make platform"
	@echo "make run-android"

cordova:
	@npm install -g cordova

add-plugins:
	@cordova plugin add cordova-plugin-whitelist
	@cordova plugin add cordova-plugin-file

	@ionic plugin add cordova-plugin-camera

serve:
	@ionic serve

platform:
	@ionic platform add android
	@ionic platform add ios

run-android:
	@ionic run android --device

run-android-refresh: clear add-plugins platform run-android

clear:
	@rm -rf platforms
	@rm -rf plugins
