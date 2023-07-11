// Authenticate
gcloud auth configure-docker us-east4-docker.pkg.dev

// Build image
./build_image.sh

// Create tag
docker tag api-documenter-server:1.0.0 us-east4-docker.pkg.dev/personal-projects-388416/server-images-repositories-new/api-documenter-server:1.0.0

// Push tag
docker push us-east4-docker.pkg.dev/personal-projects-388416/server-images-repositories-new/api-documenter-server:1.0.0

// To check existing tags
docker images api-documenter-server --format="{{ .Tag }}"
