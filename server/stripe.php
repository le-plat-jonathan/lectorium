<?php

include_once 'stripe-php/init.php';

\Stripe\Stripe::setApiKey('sk_test_51PYjamRoCeLoYtX0Rb0afYwDBx0A60qxHinws7c3mIATELUPLQfqbesCiZ5LUmDOSvydJkJb8zwDvnSIDD2tWKve00uTJ6J40Z');

header('Content-Type: application/json');

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['amount']) || !isset($data['currency']) || !isset($data['payment_method_id'])) {
        throw new Exception('Missing parameters');
    }

    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $data['amount'],
        'currency' => $data['currency'],
        'payment_method' => $data['payment_method_id'],
        'confirmation_method' => 'manual',
        'confirm' => true,
    ]);

    echo json_encode(['paymentIntent' => $paymentIntent]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>
