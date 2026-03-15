# Web Application with Database on Azure

This project demonstrates a complete CI/CD pipeline for deploying a Node.js web application with PostgreSQL database to Azure using Terraform infrastructure as code, automated testing, and quality gates.

## Architecture

- **Web App**: Node.js Express application with EJS templating
- **Database**: Azure Database for PostgreSQL Flexible Server
- **Infrastructure**: Terraform-managed Azure resources
- **Testing**: Unit tests with Jest, UI tests with Selenium
- **Quality Gates**: SonarCloud code analysis
- **CI/CD**: Azure DevOps pipeline

## Project Structure

```
├── webapp/           # Node.js Express application
├── db/              # Database schema
├── infra/           # Terraform infrastructure code
├── tests/           # Selenium UI tests
└── azure-pipelines.yml  # CI/CD pipeline definition
```

## Prerequisites

### Local Development
- Node.js 18.x
- PostgreSQL client (for local testing)
- Azure CLI
- Terraform 1.0+

### Azure Resources
- Azure subscription
- Service Principal with appropriate permissions
- SonarCloud account and organization

## Local Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd WebAppwithDBonAzure
```

### 2. Install Dependencies
```bash
# Web app
cd webapp
npm install

# Tests
cd ../tests
npm install
```

### 3. Run Unit Tests
```bash
cd webapp
npm test
```

### 4. Run the Application Locally
```bash
cd webapp
# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
npm start
```

## Azure DevOps Pipeline Setup

### 1. Service Connections

Create the following service connections in Azure DevOps:

#### Azure Resource Manager (ARM)
- **Name**: `azure-sp`
- **Service Principal**: Create a new service principal or use existing
- **Scope**: Subscription level
- **Subscription**: Your Azure subscription
- **Resource Group**: `techish-webapp-rg`

#### SonarCloud
- **Name**: `sonar-connection`
- **SonarCloud Organization**: `techishprod`
- **Token**: Generate a token from SonarCloud

### 2. Pipeline Variables

Set the following variables in your pipeline:

- `DBuser`: PostgreSQL admin username
- `DBpass`: PostgreSQL admin password

### 3. Role Assignments

#### Service Principal Permissions
Assign the following roles to your service principal (`azure-sp`):

1. **Subscription Level**:
   - `Contributor` - For creating/managing resources

2. **Resource Group Level** (`techish-webapp-rg`):
   - `Storage Blob Data Contributor` - For Terraform state storage
   - `Contributor` - For resource management

#### Terraform Backend Storage
Ensure the following Azure Storage Account exists for Terraform state:
- Resource Group: `techish-webapp-rg`
- Storage Account: `techish-tf-storage`
- Container: `tfstate`

### 4. Pipeline Stages

The pipeline consists of 5 stages:

1. **Setup**: Install required utilities (Node.js, Azure CLI, PostgreSQL client, Terraform)
2. **Infrastructure**: Deploy Azure resources using Terraform
3. **Database**: Create database schema
4. **WebApp**: Build, test, analyze code, and deploy application
5. **Selenium**: Run UI tests against deployed application

## Deployment

### Automatic Deployment
The pipeline automatically deploys when:
- Code is pushed to the `main` branch
- Quality gates pass (SonarCloud analysis)
- All tests succeed

### Manual Deployment
1. Go to Azure DevOps Pipelines
2. Select the pipeline
3. Click "Run pipeline"
4. Provide required variables if prompted

## Application Features

### Todo Management
- Add new todos
- View all todos
- Delete todos
- Status tracking (pending/done)

### API Endpoints
- `GET /` - List all todos
- `POST /add` - Add a new todo
- `POST /delete/:id` - Delete a todo by ID

## Monitoring and Logs

### Application Logs
- View in Azure Web App logs
- Application Insights integration (if configured)

### Pipeline Logs
- Azure DevOps pipeline logs
- Terraform execution logs
- Test execution results

## Security Considerations

- Database passwords stored as pipeline secrets
- Firewall rules configured for Azure services access
- Service principal with minimal required permissions
- Code analysis with SonarCloud quality gates

## Troubleshooting

### Common Issues

1. **Pipeline fails at Terraform init**
   - Check storage account and container exist
   - Verify service principal permissions

2. **Database connection fails**
   - Verify firewall rules allow Azure services
   - Check database credentials

3. **SonarCloud analysis fails**
   - Verify SonarCloud token and organization
   - Check project key generation

4. **Selenium tests fail**
   - Ensure web app is deployed and accessible
   - Check APP_URL environment variable

### Useful Commands

```bash
# Check Azure CLI login
az account show

# Test Terraform
cd infra
terraform init
terraform plan

# Run tests locally
cd webapp
npm test

# Check database connection
psql "postgresql://user:password@host:5432/dbname"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License.</content>
<parameter name="filePath">d:\Github Repos\WebAppwithDBonAzure\README.md