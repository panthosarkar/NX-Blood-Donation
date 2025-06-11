# Create a new domain configuration file
cp setup-nginx-domain-com.conf /etc/nginx/sites-available/www.src.com


# Create a symbolic link to the sites-enabled directory
sudo ln -s /etc/nginx/sites-available/www.src.com /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart the nginx server
sudo systemctl restart nginx



