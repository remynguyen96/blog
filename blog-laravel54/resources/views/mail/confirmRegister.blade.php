@component('mail::message')
# Confirm Email
<p>Xin chào <strong>{{$name}}</strong> ! Bạn vui lòng click vào nút bên dưới để  hoàn tất quá trình xác nhận email {{$email}} .</p>

@component('mail::panel')
  <ul>
    <li>Tùy thuận theo hoàn cảnh</li>
    <li>Không buộc theo ý mình</li>
    <li>Giữ tâm không giữ cảnh</li>
    <li>Tâm bình cảnh sẽ bình.</li>
  </ul>
@endcomponent

@component('mail::button', ['url' => $url, 'color' => 'green'])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
