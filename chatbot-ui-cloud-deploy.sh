#!/bin/bash
set -e

PROJECT_ID="delectable-cloud"
REGION="us-central1"
IMAGE="chatbot-ui"  # Local tag
REGISTRY_IMAGE="gcr.io/$PROJECT_ID/$IMAGE"  # Artifact Registry

COMMAND=${1:-"all"}

# DON'T FORGET TO ESTABLISH THE CREDS FOR GCP
# gcloud auth login
# gcloud config set project delectable-cloud
# gcloud config set run/region us-central1

# Build the image
docker buildx build --platform linux/amd64 -t $IMAGE:latest --load .

# Tag the image
docker tag chatbot-ui gcr.io/$PROJECT_ID/$IMAGE

# Push the image
docker push gcr.io/$PROJECT_ID/$IMAGE

gcloud beta run services add-iam-policy-binding $IMAGE \
  --region=$REGION \
  --member=allUsers \
  --role=roles/run.invoker \
  --project=$PROJECT_ID
gcloud run services add-iam-policy-binding $IMAGE \
  --region=$REGION \
  --member=serviceAccount:traefik-sa@delectable-cloud.iam.gserviceaccount.com \
  --role=roles/run.invoker \
  --project=$PROJECT_ID

# Deploy the image
gcloud run deploy $IMAGE \
  --image gcr.io/delectable-cloud/$IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --vpc-connector=dai-connector \
  --vpc-egress=all-traffic \
  --ingress=all \
  --timeout=30