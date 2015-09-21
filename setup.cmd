pause "Use with caution!  This will setup a new project tree in a folder named CUModSquad in the current directory.  This is a destructive process.  Press ^C now if you are not certain you want to do this"

: Install some global commands
call npm install rimraf -g
call npm install react -g
call npm install cu-build-tools -g

: clean up any old install
call rimraf CUModSquad

: start in a new folder
mkdir CUModSquad
cd CUModSquad

: clone repos
git clone https://github.com/Mehuge/cu-ui-v2
cd cu-ui-v2
cd lib
git clone https://github.com/Mehuge/cu-core -b injuries
git clone https://github.com/Mehuge/cu-events -b injuries
git clone https://github.com/Mehuge/cu-stores
git clone https://github.com/Mehuge/cu-components -b injuries
git clone https://github.com/Mehuge/cu-restapi
git clone https://github.com/Mehuge/cu-fake-api

cd cu-core
call npm link cu-build-tools
call npm install
call gulp install
call npm link

cd ..\cu-events
call npm link cu-build-tools cu-core react
call npm install
call gulp install
call npm link

cd ..\cu-stores
call npm link cu-build-tools cu-core cu-events react
call npm install
call gulp install
call npm link

cd ..\cu-components
call npm link cu-build-tools cu-core react
call npm install
call gulp install
call npm link

cd ..\cu-restapi
call npm install
call npm link
call npm link cu-core

cd ..\cu-fake-api
call npm install
call npm link

: back to main UI project
cd ..\..

: install main UI
call npm link cu-build-tools
call npm install

: add links to ui modules
cd apitest
call npm link react cu-core cu-events cu-stores cu-restapi cu-components
cd ..\character
call npm link react cu-core cu-events cu-stores cu-restapi cu-components
cd ..\injuries
call npm link react cu-core cu-events cu-stores cu-restapi cu-components
cd ..\enemytarget
call npm link react cu-core cu-events cu-stores cu-restapi cu-components
cd ..\friendlytarget
call npm link react cu-core cu-events cu-stores cu-restapi cu-components
cd ..\matrix
call npm link react cu-core cu-events cu-stores cu-restapi cu-components

: final install
cd ..
call gulp install
call gulp publish:all
call gulp server
