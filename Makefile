APP_NAME:=trellinho-frontend

all: build run

build:
	docker build . -t $(APP_NAME)

run:
	docker run -it --rm -p 80:80 $(APP_NAME)
