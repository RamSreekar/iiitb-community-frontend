kubectl delete secret iiitb-frontend-secret
kubectl delete ingress iiitb-community-ingress
kubectl delete service iiitb-community-frontend-service
kubectl delete deployment iiitb-community-frontend

kubectl apply -f secret.yml
kubectl apply -f ingress.yml
kubectl apply -f frontend_deployment.yml
