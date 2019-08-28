<template>
	<section class="contact-form">
		<div class="wrap">
			<div>
				<header>
					<h1>let's<br />dance.</h1>
					<article
						v-html="$store.state.siteData.data[0].contactFormBlurb"
					></article>
				</header>
				<section class="careers">
					<h3>careers</h3>
					<button>careers@ellcreative.com</button>
				</section>
			</div>
			<form class="relative" v-on:submit.prevent="checkForm">
				<transition name="fade">
					<section v-if="formSending" class="pre-loader">
						<div class="sk-cube-grid">
							<div class="sk-cube sk-cube1"></div>
							<div class="sk-cube sk-cube2"></div>
							<div class="sk-cube sk-cube3"></div>
							<div class="sk-cube sk-cube4"></div>
							<div class="sk-cube sk-cube5"></div>
							<div class="sk-cube sk-cube6"></div>
							<div class="sk-cube sk-cube7"></div>
							<div class="sk-cube sk-cube8"></div>
							<div class="sk-cube sk-cube9"></div>
						</div>
					</section>
				</transition>
				<transition name="fade">
					<section v-if="formSuccess" class="form-success">
						<div class="success__block msg-block" role="alert">
							<div class="flex items-center">
								<div class="py-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
										/>
									</svg>
								</div>
								<div>
									<p>Your message was successfully sent!</p>
								</div>
							</div>
						</div>
					</section>
				</transition>
				<input type="hidden" name="handle" value="contactForm" />
				<div class="input-wrap">
					<label for="name">Your Name</label>
					<input
						id="contactName"
						v-model="formData.contactName"
						v-validate="'required|alpha_spaces'"
						class="form-input"
						name="contactName"
						type="text"
					/>
					<transition name="fade">
						<div
							v-show="errors.has('contactName')"
							class="error__block msg-block"
							role="alert"
						>
							<div class="flex items-center">
								<div class="py-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
										/>
									</svg>
								</div>
								<div>
									<p>Your name is required.</p>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="input-wrap">
					<label for="email">Email Address</label>
					<input
						id="contactEmail"
						v-model="formData.contactEmail"
						v-validate="'required|email'"
						class="form-input"
						name="contactEmail"
						type="email"
					/>
					<transition name="fade">
						<div
							v-show="errors.has('contactEmail')"
							class="error__block msg-block"
							role="alert"
						>
							<div class="flex items-center">
								<div class="py-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
										/>
									</svg>
								</div>
								<div>
									<p>Your e-mail is required.</p>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="input-wrap">
					<label for="phone">Phone Number (optional)</label>
					<input
						id="contactPhone"
						v-model="formData.contactPhone"
						v-validate="'numeric'"
						class="form-input"
						name="contactPhone"
						type="tel"
					/>
				</div>
				<div class="input-wrap">
					<label for="message">Message</label>
					<textarea
						id="contactMessage"
						v-model="formData.contactMessage"
						v-validate="'required'"
						class="form-input"
						name="contactMessage"
					>
					</textarea>
					<transition name="fade">
						<div
							v-show="errors.has('contactMessage')"
							class="error__block msg-block"
							role="alert"
						>
							<div class="flex items-center">
								<div class="py-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
										/>
									</svg>
								</div>
								<div>
									<p>Your message is required.</p>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="button-wrap">
					<button
						type="submit"
						class="site__button site__button-form"
					>
						<span>Submit</span>
					</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ContactForm',
	data() {
		return {
			formData: {
				contactName: null,
				contactEmail: null,
				contactPhone: null,
				contactMessage: null
			},
			formSending: false,
			formSuccess: false
		}
	},
	methods: {
		checkForm: function(e) {
			this.$validator
				.validateAll()
				.then(res => {
					this.formSuccess = false
					if (res) {
						this.formSending = true
						this.$axios
							.$post(
								process.env.NODE_ENV !== 'production'
									? process.env.API
									: 'https://ellcreative.com/api',
								this.formData
							)
							.then(response => {
								if (response === true) {
									this.formSending = false
									this.formSuccess = true
								}
							})
					}
				})
				.catch(e => {
					console.log(e)
				})
			e.preventDefault()
		}
	}
}
</script>
