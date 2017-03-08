#!/usr/bin/env bash
set -euo pipefail

PROJECT=$1
CLUSTER=$2

gcloud container clusters get-credentials ${CLUSTER} --zone europe-west1-b --project ${PROJECT}
kubectl cluster-info | grep master | awk '{ print $6 }'

SECRET=$(kubectl get secrets | grep -E '^default' | awk '{ print $1  }')
kubectl describe secret $SECRET | grep -E '^token:' | awk '{ print $2 }'


