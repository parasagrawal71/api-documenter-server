// Authenticate
gcloud auth configure-docker asia-south1-docker.pkg.dev

// Build image
./build_image.sh

// Create tag
docker tag api-documenter-server:1.0.0 asia-south1-docker.pkg.dev/api-documenter-server-388106/server-images-repository/api-documenter-server:1.0.0

// Push tag
docker push asia-south1-docker.pkg.dev/api-documenter-server-388106/server-images-repository/api-documenter-server:1.0.0

// To check existing tags
docker images api-documenter-server --format="{{ .Tag }}"
