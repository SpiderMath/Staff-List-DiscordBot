wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

export NVM_DIR="$HOME/.nvm" &&
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" &&
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion" &&

nvm install 16.6.1 &&
nvm use 16.6.1

npm run start