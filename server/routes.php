<?php

include 'cors.php';
include 'db.php';
include 'User.php';
include 'Order.php';
include 'Account.php';
include 'Cart.php';

$action = $_GET['action'];
$id = $_GET['id'] ?? null;
$user_id = $_GET['user_id'] ?? null;

$user = new User($pdo);
$order = new Order($pdo);
$account = new Account($pdo);
$cart = new Cart($pdo);

switch ($action) {
    // User
    case 'create_user':
        echo json_encode($user->create($_POST['email'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['address'], $_POST['zip_code'], $_POST['city']));
        break;
    case 'get_user':
        echo json_encode($user->getById($id));
        break;
    case 'update_user':
        echo json_encode($user->update($id, $_POST['email'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['address'], $_POST['zip_code'], $_POST['city']));
        break;
    case 'delete_user':
        echo json_encode($user->delete($id));
        break;

    // Order
    case 'create_order':
        echo json_encode($order->create($_POST['total'], $_POST['user_id']));
        break;
    case 'get_order':
        echo json_encode($order->getById($id));
        break;
    case 'update_order':
        echo json_encode($order->update($id, $_POST['total']));
        break;
    case 'delete_order':
        echo json_encode($order->delete($id));
        break;

    // Account
    case 'create_account':
        echo json_encode($account->create($_POST['name'], $_POST['type'], $_POST['balance'], $_POST['user_id']));
        break;
    case 'get_account':
        echo json_encode($account->getById($id));
        break;
    case 'update_account':
        echo json_encode($account->update($id, $_POST['name'], $_POST['type'], $_POST['balance']));
        break;
    case 'delete_account':
        echo json_encode($account->delete($id));
        break;

    // Cart
    case 'add_to_cart':
        echo json_encode($cart->add($_POST['book_id'], $_POST['quantity'], $_POST['user_id']));
        break;
    case 'get_cart':
        echo json_encode($cart->getByUserId($user_id));
        break;
    case 'update_cart':
        echo json_encode($cart->update($id, $_POST['quantity']));
        break;
    case 'remove_from_cart':
        echo json_encode($cart->remove($id));
        break;

    default:
        echo json_encode(['message' => 'Invalid action']);
}
?>
