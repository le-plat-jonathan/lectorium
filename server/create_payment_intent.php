<?php

require_once 'vendor/stripe-php/init.php';

\Stripe\Stripe::setApiKey('sk_test_51PYjamRoCeLoYtX0Rb0afYwDBx0A60qxHinws7c3mIATELUPLQfqbesCiZ5LUmDOSvydJkJb8zwDvnSIDD2tWKve00uTJ6J40Z');

header('Content-Type: application/json');

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['amount']) || !isset($data['currency'])) {
        throw new Exception('Missing parameters');
    }

    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $data['amount'],
        'currency' => $data['currency'],
    ]);

    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}

?>
