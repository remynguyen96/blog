<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ConfirmRegister extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    private $member;

    public function __construct($user)
    {
        $this->member = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.confirmRegister')->with([
          'name' => $this->member['name'],
          'email' => $this->member['email'],
          'url' => $this->member['url'],
        ])->subject('Confirm Email Sign Up');
    }
}
