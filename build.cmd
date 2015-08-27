cd character
call gulp publish
cd ..\enemytarget
call gulp publish
cd ..\friendlytarget
call gulp publish
cd ..
call gulp resources
cd publish
move character\character.ui .
move enemytarget\enemytarget.ui .
move friendlytarget\friendlytarget.ui .
cd ..

