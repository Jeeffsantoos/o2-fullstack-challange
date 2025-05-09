#!/usr/bin/env bash

ollama serve &
ollama list
ollama pull llama2
ollama pull orca-mini
