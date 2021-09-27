
FROM gitpod/workspace-full

USER root

# Install custom tools, runtime, etc.
RUN ["apt-get", "update"]

RUN ["apt-get", "install", "-y", "zsh"]

USER gitpod

COPY ./.gitpod/oh-my-zsh.sh ./.gitpod/oh-my-zsh.sh

# Install Oh-My-Zsh and setup zsh
RUN sudo chmod +x ./.gitpod/oh-my-zsh.sh && ./.gitpod/oh-my-zsh.sh

# install aws cdk && aws-cli v2
RUN npm i -g aws-cdk && \
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \ 
  unzip awscliv2.zip && \
  sudo ./aws/install

# start zsh
CMD ["zsh"]