d:
cd \temp
call npm install rimraf -g
call rimraf cu-ui-test
mkdir cu-ui-test
cd cu-ui-test
git clone https://github.com/Mehuge/cu-ui-v2
cd cu-ui-v2
cd lib
git clone https://github.com/Mehuge/cu-components
cd ..
call npm install
call gulp install
call gulp publish
call gulp server