# Makefile for UK Analytics Engine
# Serzhan Birzhan | APE2601

CXX = g++
CXXFLAGS = -std=c++20 -O3 -Wall -Wextra
TARGET = uk_analyzer
SRC = uk_analyzer.cpp

all: build

build: $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET)

run: build
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all build run clean
