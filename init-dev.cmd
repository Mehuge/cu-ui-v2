:: install development packages
call npm install

:: clone libraries
git clone https://github.com/Mehuge/cu-components lib/cu-components

:: install all module and library dependencies/definitions
gulp install
