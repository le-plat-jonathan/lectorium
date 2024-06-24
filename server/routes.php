<?php

// Headers pour gérer les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gestion des requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion des fichiers de classes nécessaires
include_once 'cors.php';
include_once 'db.php';
include_once 'classes\User.php';
include_once 'classes\Order.php';
include_once 'classes\Account.php';
include_once 'classes\Cart.php';

// Création d'une connexion à la base de données
try {
    $pdo = new PDO("mysql:host=localhost;dbname=lectorium;charset=utf8", 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit();
}

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$action = isset($request_uri[1]) ? $request_uri[1] : '';
$id = isset($request_uri[2]) ? $request_uri[2] : null;

// Création des objets nécessaires
$user = new User($pdo);
$order = new Order($pdo);
$account = new Account($pdo);
$cart = new Cart($pdo);

// Gestion des requêtes en fonction de la méthode HTTP
switch ($request_method) {
    case 'POST':
        handlePostRequest($action);
        break;
    case 'GET':
        handleGetRequest($action, $id);
        break;
    case 'PUT':
        handlePutRequest($action, $id);
        break;
    case 'DELETE':
        handleDeleteRequest($action, $id);
        break;
    default:
        echo json_encode(['message' => 'Invalid request method.']);
        break;
}

// Fonction pour gérer les requêtes POST
function handlePostRequest($action) {
    global $user, $order, $account, $cart;
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($action) {
        case 'create_user':
            echo json_encode($user->create($input['email'], $input['password'], $input['firstname'], $input['lastname'], $input['address'], $input['zip_code'], $input['city']));
            break;
        case 'create_order':
            echo json_encode($order->create($input['total'], $input['user_id']));
            break;
        case 'create_account':
            echo json_encode($account->create($input['name'], $input['type'], $input['balance'], $input['user_id']));
            break;
        case 'add_to_cart':
            echo json_encode($cart->add($input['book_id'], $input['quantity'], $input['user_id']));
            break;
        default:
            echo json_encode(['message' => 'Invalid POST action.']);
            break;
    }
}
// Fonction pour gérer les requêtes GET
function handleGetRequest($action, $id) {
    global $user, $order, $account, $cart;
    switch ($action) {
        case 'get_user':
            echo json_encode($user->getById($id));
            break;
        case 'get_order':
            echo json_encode($order->getById($id));
            break;
        case 'get_account':
            echo json_encode($account->getById($id));
            break;
        case 'get_cart':
            echo json_encode($cart->getByUserId($id));
            break;
        default:
            echo json_encode(['message' => 'Invalid GET action.']);
            break;
    }
}

// Fonction pour gérer les requêtes PUT
function handlePutRequest($action, $id) {
    global $user, $order, $account, $cart;
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($action) {
        case 'update_user':
            echo json_encode($user->update($id, $input['email'], $input['password'], $input['firstname'], $input['lastname'], $input['address'], $input['zip_code'], $input['city']));
            break;
        case 'update_order':
            echo json_encode($order->update($id, $input['total']));
            break;
        case 'update_account':
            echo json_encode($account->update($id, $input['name'], $input['type'], $input['balance']));
            break;
        case 'update_cart':
            echo json_encode($cart->update($id, $input['quantity']));
            break;
        default:
            echo json_encode(['message' => 'Invalid PUT action.']);
            break;
    }
}

// Fonction pour gérer les requêtes DELETE
function handleDeleteRequest($action, $id) {
    global $user, $order, $account, $cart;

    switch ($action) {
        case 'delete_user':
            echo json_encode($user->delete($id));
            break;
        case 'delete_order':
            echo json_encode($order->delete($id));
            break;
        case 'delete_account':
            echo json_encode($account->delete($id));
            break;
        case 'remove_from_cart':
            echo json_encode($cart->remove($id));
            break;
        default:
            echo json_encode(['message' => 'Invalid DELETE action.']);
            break;
    }
}
?>
