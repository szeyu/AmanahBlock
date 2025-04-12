make commit-jack:
	@git add .
	@git commit -m $message
	@git push origin jack-branch-2

make commit:
	@git add .
	@git commit -m $message
	@git push origin main