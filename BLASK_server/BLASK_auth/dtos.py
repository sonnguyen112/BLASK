class SignInDTO():
    def __init__(self, token, user, user_profile):
        self.token = token.key
        self.email = user.email
        self.username = user.username
        self.first_name = user_profile.first_name
        self.last_name = user_profile.last_name
        self.avatar = user_profile.profile_pic